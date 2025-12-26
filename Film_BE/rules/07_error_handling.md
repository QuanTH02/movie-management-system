# Error Handling Guidelines

## Overview

This document outlines the standards and best practices for handling errors in our Django project. Proper error handling is essential for maintaining application stability, providing meaningful feedback to users, and facilitating debugging.

## Error Handling Principles

1. **Be specific**: Use specific exception types
2. **Be informative**: Provide clear error messages
3. **Be secure**: Don't leak sensitive information
4. **Be consistent**: Follow consistent error handling patterns
5. **Be helpful**: Guide users toward resolution
6. **Log appropriately**: Log errors with sufficient context

## Django REST Framework Error Handling

### Custom Exception Handler

We use a custom exception handler to provide consistent error responses:

```python
# utils/custom_exception_handler.py
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """
    Custom exception handler for DRF.
    Returns standardized error responses.
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)

    # If unexpected error occurs (not handled by DRF)
    if response is None:
        logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
        return Response(
            {"detail": "An unexpected error occurred."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    # Customize the response format
    if isinstance(response.data, dict):
        error_data = {
            "status": "error",
            "code": response.status_code,
        }

        # Handle different error formats
        if "detail" in response.data:
            error_data["message"] = response.data["detail"]
        elif "non_field_errors" in response.data:
            error_data["message"] = response.data["non_field_errors"][0]
        else:
            error_data["errors"] = response.data
            error_data["message"] = "Validation error"

        response.data = error_data

    return response
```

### Configuration

Configure the custom exception handler in `settings.py`:

```python
REST_FRAMEWORK = {
    # ... other settings ...
    "EXCEPTION_HANDLER": "utils.custom_exception_handler.custom_exception_handler",
}
```

## Custom Exceptions

Define custom exceptions for specific error cases:

```python
# apps/core/exceptions.py
from rest_framework.exceptions import APIException
from rest_framework import status

class ResourceNotFoundException(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "The requested resource was not found."
    default_code = "resource_not_found"

class InvalidOperationException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "This operation is not valid."
    default_code = "invalid_operation"

class InsufficientPermissionsException(APIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = "You don't have permission to perform this action."
    default_code = "insufficient_permissions"

class BusinessLogicException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "A business rule validation failed."
    default_code = "business_logic_error"
```

## Exception Usage in Services and Views

### In Services:

```python
# apps/projects/services/project_service.py
from apps.core.exceptions import ResourceNotFoundException, BusinessLogicException
from apps.projects.models import Project

class ProjectService:
    @staticmethod
    def get_project_by_id(project_id):
        try:
            return Project.objects.get(id=project_id)
        except Project.DoesNotExist:
            raise ResourceNotFoundException(f"Project with ID {project_id} does not exist.")

    @staticmethod
    def archive_project(project, user):
        if project.is_archived:
            raise BusinessLogicException("Project is already archived.")

        if project.owner != user:
            raise InsufficientPermissionsException("Only the project owner can archive a project.")

        project.is_archived = True
        project.updated_by = user
        project.save(update_fields=['is_archived', 'updated_by', 'updated_at'])
        return project
```

### In Views:

```python
# apps/projects/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.projects.services.project_service import ProjectService
from apps.core.exceptions import BusinessLogicException, InsufficientPermissionsException

class ProjectViewSet(viewsets.ModelViewSet):
    # ... other code ...

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        try:
            project = self.get_object()
            ProjectService.archive_project(project, request.user)
            return Response({"status": "Project archived"}, status=status.HTTP_200_OK)
        except (BusinessLogicException, InsufficientPermissionsException) as e:
            # These exceptions will be handled by the custom exception handler
            raise
        except Exception as e:
            # Log unexpected errors and return a generic error message
            logger.error(f"Error archiving project {pk}: {str(e)}", exc_info=True)
            return Response(
                {"error": "An unexpected error occurred while archiving the project."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
```

## Database Error Handling

Handle database-related errors:

```python
from django.db import IntegrityError, transaction

def create_user_profile(user_data, profile_data):
    try:
        with transaction.atomic():
            user = User.objects.create_user(**user_data)
            profile = Profile.objects.create(user=user, **profile_data)
            return user, profile
    except IntegrityError as e:
        logger.error(f"Database integrity error: {str(e)}")
        raise BusinessLogicException("Could not create user due to data constraints.")
```

## Validation Errors

Handle validation errors in serializers:

```python
# apps/projects/serializers.py
from rest_framework import serializers
from apps.projects.models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'is_active', 'owner']

    def validate_name(self, value):
        if Project.objects.filter(name=value).exists():
            raise serializers.ValidationError("A project with this name already exists.")
        return value

    def validate(self, data):
        if 'description' in data and len(data['description']) > 1000:
            raise serializers.ValidationError({
                "description": "Description is too long (max 1000 characters)."
            })
        return data
```

## Error Logging

Implement proper error logging:

```python
import logging

logger = logging.getLogger(__name__)

def process_data(data):
    try:
        # Process data
        result = perform_complex_operation(data)
        return result
    except ValueError as e:
        logger.warning(f"Invalid data format: {str(e)}", extra={
            "data_id": data.get("id"),
            "user_id": self.request.user.id
        })
        raise BusinessLogicException("Invalid data format.")
    except Exception as e:
        logger.error(f"Error processing data: {str(e)}", exc_info=True, extra={
            "data_id": data.get("id"),
            "user_id": self.request.user.id
        })
        raise
```

## Error Response Format

Use a consistent format for error responses:

```json
{
  "status": "error",
  "code": 400,
  "message": "The request could not be processed.",
  "errors": {
    "field_name": ["Error message for this field."]
  }
}
```

## Client-Side Error Handling

Provide guidelines for frontend to handle different error types:

- 400: Bad Request - Display validation errors
- 401: Unauthorized - Redirect to login
- 403: Forbidden - Show permission denied message
- 404: Not Found - Show not found page
- 500: Server Error - Show generic error message

## Security Considerations

- Don't expose sensitive information in error messages
- Don't reveal system details in production errors
- Log sensitive operations (authentication failures, permission violations)
- Rate limit error-prone endpoints to prevent abuse

## Monitoring and Alerting

- Set up monitoring for error rates
- Create alerts for critical errors
- Track error trends
- Regularly review error logs

## Best Practices

1. **Use try-except judiciously**: Don't catch exceptions too broadly
2. **Handle exceptions at the appropriate level**: Let exceptions bubble up when appropriate
3. **Don't silence exceptions**: Always log or handle exceptions
4. **Use context managers**: For resource cleanup (`with` statements)
5. **Separate system errors from business logic errors**: Different handling strategies
6. **Document error codes**: Maintain a list of error codes and their meanings
7. **Test error cases**: Include error scenarios in tests

By following these error handling guidelines, we ensure our application provides clear feedback to users, facilitates debugging, and maintains stability even when errors occur.
