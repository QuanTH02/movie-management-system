# Asynchronous Task Processing Guidelines

## Overview

This document outlines the standards and best practices for implementing and managing asynchronous tasks in our Django project using Celery. Asynchronous processing is essential for handling time-consuming operations without blocking the request-response cycle.

## Celery Configuration

### Basic Setup

Our project uses Celery with Redis as the message broker and result backend:

```python
# aiWriting/celery.py
import os
from celery import Celery

# Set the default Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "aiWriting.settings")

# Create the Celery app
app = Celery("aiWriting")

# Load task modules from all registered Django app configs
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
```

### Settings Configuration

Configure Celery in `settings.py`:

```python
# Celery settings
CELERY_BROKER_URL = "redis://redis:6379/0"
CELERY_RESULT_BACKEND = "redis://redis:6379/0"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = "UTC"
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60  # 30 minutes
```

## Task Organization

### Task Modules

Organize tasks in dedicated modules within each app:

```
apps/
  ├── projects/
  │   ├── tasks.py         # App-specific tasks
  │   ├── models.py
  │   └── ...
  ├── documents/
  │   ├── tasks.py
  │   └── ...
  └── ...
aiWriting/
  ├── celery.py            # Celery configuration
  ├── tasks.py             # Project-wide tasks
  └── ...
```

### Task Naming

Use descriptive task names with app prefixes:

```python
# apps/projects/tasks.py
from aiWriting.celery import app

@app.task(name="projects.generate_project_report")
def generate_project_report(project_id):
    # Task implementation
    pass
```

## Task Implementation

### Task Definition

Define tasks with appropriate retry and error handling:

```python
# apps/documents/tasks.py
from aiWriting.celery import app
from celery.utils.log import get_task_logger
from celery.exceptions import MaxRetriesExceededError

logger = get_task_logger(__name__)

@app.task(
    bind=True,
    name="documents.process_document",
    max_retries=3,
    retry_backoff=True,
    retry_backoff_max=600,  # 10 minutes
    acks_late=True,
)
def process_document(self, document_id):
    from apps.documents.models import Document
    from apps.documents.services.document_service import DocumentService

    logger.info(f"Processing document {document_id}")

    try:
        document = Document.objects.get(id=document_id)
        DocumentService.process_document(document)
        logger.info(f"Successfully processed document {document_id}")
    except Document.DoesNotExist:
        logger.error(f"Document {document_id} not found")
        # Don't retry if document doesn't exist
    except Exception as exc:
        logger.error(f"Error processing document {document_id}: {str(exc)}")
        try:
            self.retry(exc=exc)
        except MaxRetriesExceededError:
            logger.error(f"Max retries exceeded for document {document_id}")
            # Update document status to indicate failure
            Document.objects.filter(id=document_id).update(
                status="failed",
                error_message=str(exc)
            )
```

### Task Parameters

- **bind=True**: Gives access to task instance (self)
- **max_retries**: Maximum number of retries
- **retry_backoff**: Use exponential backoff for retries
- **acks_late**: Acknowledge task after it's completed
- **time_limit**: Maximum execution time
- **soft_time_limit**: Soft time limit (can be caught and handled)
- **autoretry_for**: Tuple of exceptions to retry automatically
- **retry_kwargs**: Additional retry parameters
- **ignore_result**: Don't store task result if not needed
- **rate_limit**: Limit task execution rate

## Task Calling

### Calling Tasks

Call tasks using the delay or apply_async methods:

```python
# Simple call
from apps.documents.tasks import process_document
process_document.delay(document_id)

# Advanced call with options
from apps.projects.tasks import generate_project_report
generate_project_report.apply_async(
    args=[project_id],
    countdown=60,  # Wait 60 seconds before execution
    expires=3600,  # Task expires after 1 hour
    priority=5     # Higher priority
)
```

### From Views

Call tasks from views after completing request handling:

```python
# apps/documents/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.documents.models import Document
from apps.documents.tasks import process_document

class DocumentViewSet(viewsets.ModelViewSet):
    # ... model, serializer, etc.

    @action(detail=True, methods=["post"])
    def process(self, request, pk=None):
        document = self.get_object()

        # Update status to processing
        document.status = "processing"
        document.save(update_fields=["status"])

        # Queue the task
        process_document.delay(document.id)

        return Response(
            {"status": "Document processing started"},
            status=status.HTTP_202_ACCEPTED
        )
```

## Task Progress and Status Tracking

### Status Model

Track task status using a database model:

```python
# apps/tasks/models.py
from django.db import models
from apps.core.models import BaseModel

class TaskStatus(BaseModel):
    STATUS_PENDING = "pending"
    STATUS_PROCESSING = "processing"
    STATUS_COMPLETED = "completed"
    STATUS_FAILED = "failed"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_PROCESSING, "Processing"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_FAILED, "Failed"),
    ]

    task_id = models.CharField(max_length=255, unique=True)
    task_name = models.CharField(max_length=255)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING
    )
    progress = models.IntegerField(default=0)  # 0-100
    result = models.JSONField(null=True, blank=True)
    error_message = models.TextField(blank=True)
    related_object_id = models.IntegerField(null=True, blank=True)
    related_object_type = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.task_name} ({self.status})"
```

### Progress Updates

Update task progress from within tasks:

```python
# apps/documents/tasks.py
@app.task(bind=True, name="documents.process_document")
def process_document(self, document_id):
    from apps.tasks.models import TaskStatus

    # Create or get task status
    task_status, _ = TaskStatus.objects.get_or_create(
        task_id=self.request.id,
        defaults={
            "task_name": "process_document",
            "status": TaskStatus.STATUS_PROCESSING,
            "related_object_id": document_id,
            "related_object_type": "Document"
        }
    )

    try:
        # Process document in steps
        # Update progress after each step
        task_status.progress = 25
        task_status.save(update_fields=["progress"])

        # More processing...
        task_status.progress = 50
        task_status.save(update_fields=["progress"])

        # More processing...
        task_status.progress = 75
        task_status.save(update_fields=["progress"])

        # Finalize
        task_status.progress = 100
        task_status.status = TaskStatus.STATUS_COMPLETED
        task_status.save(update_fields=["progress", "status"])

    except Exception as e:
        task_status.status = TaskStatus.STATUS_FAILED
        task_status.error_message = str(e)
        task_status.save(update_fields=["status", "error_message"])
        raise
```

## Task Scheduling

### Periodic Tasks

Schedule periodic tasks using Celery Beat:

```python
# settings.py
from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    "clean-expired-documents": {
        "task": "documents.clean_expired_documents",
        "schedule": crontab(hour=3, minute=0),  # Run at 3:00 AM daily
    },
    "send-weekly-report": {
        "task": "projects.send_weekly_report",
        "schedule": crontab(day_of_week=1, hour=8, minute=0),  # Monday at 8:00 AM
        "kwargs": {"report_type": "summary"},
    },
}
```

## Task Monitoring and Management

### Monitoring Tools

- Flower: Web-based Celery monitoring tool
- Redis Commander: Monitor Redis queues
- Celery Prometheus Exporter: Export metrics for Prometheus
- Sentry: Error tracking

### Deployment Configuration

```yaml
# Example docker-compose.yml excerpt
services:
  redis:
    image: redis:6
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  celery_worker:
    build: .
    command: celery -A aiWriting worker -l INFO
    volumes:
      - .:/app
    depends_on:
      - redis
      - db
    env_file:
      - .env

  celery_beat:
    build: .
    command: celery -A aiWriting beat -l INFO
    volumes:
      - .:/app
    depends_on:
      - redis
      - celery_worker
    env_file:
      - .env

  flower:
    build: .
    command: celery -A aiWriting flower
    ports:
      - "5555:5555"
    depends_on:
      - redis
      - celery_worker
    env_file:
      - .env
```

## Best Practices

### Task Design

1. **Keep tasks small and focused**: Each task should have a single responsibility
2. **Make tasks idempotent**: Tasks should be safe to run multiple times
3. **Handle errors properly**: Include appropriate error handling and retry logic
4. **Use transactions**: Wrap database operations in transactions
5. **Log task actions**: Include logging for debugging and monitoring
6. **Store results only when needed**: Use ignore_result=True for tasks where the result isn't needed
7. **Don't pass complex objects**: Pass IDs instead of serializing objects

### Performance

1. **Optimize database queries**: Minimize database operations in tasks
2. **Use bulk operations**: For tasks processing multiple items
3. **Consider chunking**: Break large tasks into smaller chunks
4. **Use result expiration**: Set result_expires for task results
5. **Monitor queue size**: Avoid queue buildup

### Security

1. **Validate inputs**: Validate all inputs to tasks
2. **Don't store sensitive data in results**: Be careful with task results
3. **Use task routing**: Route tasks to appropriate workers
4. **Set resource limits**: Limit CPU, memory, and time for tasks

### Deployment

1. **Use multiple workers**: Scale horizontally for better throughput
2. **Configure concurrency**: Set appropriate worker concurrency
3. **Use different queues**: Separate queues for different task types
4. **Monitor worker health**: Set up monitoring and alerts
5. **Graceful restarts**: Use --statedb for preserving task state during restarts

By following these asynchronous task processing guidelines, we ensure our application remains responsive and can efficiently handle time-consuming operations in the background.
