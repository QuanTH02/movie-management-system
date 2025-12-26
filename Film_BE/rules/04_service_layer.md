# Service Layer Guidelines

## Overview

This document outlines the standards and best practices for implementing the service layer in our Django project. The service layer serves as an intermediary between views and models, encapsulating business logic.

## Purpose of the Service Layer

- Separate business logic from presentation logic
- Reuse business logic across different views
- Make views slim and focused on request/response handling
- Improve testability by isolating business logic
- Provide a clear interface for business operations

## Directory Structure

- Each app should have a `services` directory
- Organize services by functionality or domain
- Name service files clearly to indicate their purpose

```
apps/
  ├── users/
  │   ├── services/
  │   │   ├── __init__.py
  │   │   ├── authentication_service.py
  │   │   ├── profile_service.py
  │   │   └── user_management_service.py
  │   ├── models.py
  │   ├── views.py
  │   └── ...
```

## Service Implementation

- Create service classes with clear, focused responsibilities
- Use descriptive method names
- Handle exceptions properly
- Document methods with docstrings
- Return clear, consistent results
- Avoid dependencies on request objects

### Example Service:

```python
# apps/projects/services/project_service.py
from typing import Dict, List, Optional, Any

from django.db import transaction
from django.core.exceptions import ValidationError

from apps.projects.models import Project
from apps.users.models import User


class ProjectService:
    """
    Service for managing projects.
    """

    @staticmethod
    def create_project(name: str, description: str, owner: User, **kwargs) -> Project:
        """
        Create a new project with the given name, description, and owner.

        Args:
            name: The project name
            description: The project description
            owner: The user who will own the project
            **kwargs: Additional project attributes

        Returns:
            The created project instance

        Raises:
            ValidationError: If project data is invalid
        """
        try:
            with transaction.atomic():
                project = Project(
                    name=name,
                    description=description,
                    owner=owner,
                    created_by=owner,
                    **kwargs
                )
                project.full_clean()
                project.save()
                project.members.add(owner)
                return project
        except Exception as e:
            raise ValidationError(f"Failed to create project: {str(e)}")

    @staticmethod
    def add_member(project: Project, user: User, added_by: User) -> None:
        """
        Add a user as a member to a project.

        Args:
            project: The project to add the member to
            user: The user to add as a member
            added_by: The user performing the action

        Raises:
            ValidationError: If the user is already a member
        """
        if project.members.filter(id=user.id).exists():
            raise ValidationError("User is already a member of this project")

        project.members.add(user)
        project.updated_by = added_by
        project.save(update_fields=['updated_by', 'updated_at'])
```

## Using Services in Views

- Import and use services in view classes
- Pass explicit parameters to service methods
- Handle service exceptions and return appropriate responses
- Keep view logic focused on request/response handling

### Example View Using a Service:

```python
# apps/projects/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.projects.models import Project
from apps.projects.serializers import ProjectSerializer, ProjectMemberSerializer
from apps.projects.services.project_service import ProjectService
from apps.users.models import User


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(members=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        try:
            data = serializer.validated_data
            project = ProjectService.create_project(
                name=data['name'],
                description=data.get('description', ''),
                owner=self.request.user,
                is_active=data.get('is_active', True)
            )
            serializer.instance = project
        except ValidationError as e:
            raise serializers.ValidationError(str(e))

    @action(detail=True, methods=['post'], serializer_class=ProjectMemberSerializer)
    def add_member(self, request, pk=None):
        project = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                user_id = serializer.validated_data['user_id']
                user = User.objects.get(id=user_id)
                ProjectService.add_member(project, user, request.user)
                return Response({"status": "Member added"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response(
                    {"error": "User not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            except ValidationError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## Testing Services

- Write comprehensive unit tests for service methods
- Mock external dependencies
- Test success and failure cases
- Ensure test coverage for all service methods

## Best Practices

1. Keep services focused on specific functionality
2. Use type hints for better code documentation
3. Handle transactions appropriately
4. Use proper error handling and validation
5. Follow the Single Responsibility Principle
6. Make services stateless when possible
7. Document service methods clearly
8. Write comprehensive unit tests

By following these service layer guidelines, we ensure our business logic is well-organized, maintainable, and testable.
