# API Design Guidelines

## Overview

This document outlines the standards and best practices for designing and implementing RESTful APIs in our Django project using Django REST Framework (DRF).

## URL Structure

- Use resource-oriented URLs
- Organize URLs hierarchically
- Use plural nouns for collections
- Avoid verbs in URLs except for special actions
- Use kebab-case for URL paths

### Examples:

```
/api/v1/users/                  # List or create users
/api/v1/users/{id}/             # Retrieve, update, or delete a user
/api/v1/users/{id}/projects/    # List projects belonging to a user
/api/v1/organizations/{id}/members/  # List members of an organization
```

## HTTP Methods

- `GET`: Retrieve resources
- `POST`: Create resources
- `PUT`: Update resources (full update)
- `PATCH`: Partial update of resources
- `DELETE`: Remove resources

## Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `204 No Content`: Successful request with no response body
- `400 Bad Request`: Invalid request
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Permission denied
- `404 Not Found`: Resource not found
- `405 Method Not Allowed`: HTTP method not supported
- `500 Internal Server Error`: Server error

## Request & Response Format

- Use JSON for request and response bodies
- Use snake_case for JSON field names
- Include appropriate content-type headers
- Wrap responses in a consistent format
- Include pagination for list endpoints

### Example Response:

```json
{
  "id": 1,
  "name": "Project Name",
  "description": "Project description",
  "created_at": "2023-01-01T12:00:00Z",
  "is_active": true,
  "owner": {
    "id": 1,
    "username": "johndoe"
  }
}
```

## Filtering, Sorting & Pagination

- Use query parameters for filtering (e.g., `?status=active`)
- Allow sorting with query parameters (e.g., `?ordering=-created_at`)
- Implement pagination for all list endpoints
- Document all supported query parameters

## Serializers

- Create separate serializers for different use cases (list, detail, create, update)
- Nest related resources as appropriate
- Validate input data thoroughly
- Handle errors gracefully
- Use SerializerMethodField for computed properties

```python
class ProjectSerializer(serializers.ModelSerializer):
    owner = UserBasicSerializer(read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'created_at',
            'updated_at', 'is_active', 'owner'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
```

## Views

- Use ViewSets for standard CRUD operations
- Use APIView for custom endpoints
- Implement appropriate permissions
- Document with docstrings
- Include proper error handling
- **Views handle all request/response logic**: Views are responsible for:
  - Parsing and validating request data
  - Calling service methods with extracted parameters
  - Handling service exceptions and converting to appropriate HTTP responses
  - Formatting response data using serializers
  - Setting appropriate HTTP status codes
- **Services handle business logic only**: Services should not depend on request objects
- **Schema generation**: Views should use proper serializers and docstrings to enable automatic schema generation for frontend

### View Responsibilities

Views are responsible for:
1. **Request handling**: Parse request data, validate with serializers, extract parameters
2. **Service invocation**: Call service methods with extracted parameters (not request objects)
3. **Response formatting**: Use serializers to format response data
4. **Error handling**: Catch service exceptions and return appropriate HTTP responses
5. **Status codes**: Set correct HTTP status codes
6. **Documentation**: Include docstrings for API documentation and schema generation

### Example View with Service:

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.projects.models import Project
from apps.projects.serializers import ProjectSerializer, ProjectMemberSerializer
from apps.projects.services.project_service import ProjectService
from apps.core.exceptions import ResourceNotFoundException, BusinessLogicException


class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing projects.
    
    list:
    Return a list of all projects for the authenticated user.
    
    retrieve:
    Return the given project.
    
    create:
    Create a new project.
    
    update:
    Update an existing project.
    
    destroy:
    Delete a project.
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Get queryset of projects for the current user."""
        return Project.objects.filter(
            members=self.request.user
        ).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        """
        Create a new project.
        
        Request body:
        - name (required): Project name
        - description (optional): Project description
        - is_active (optional): Whether project is active
        
        Returns:
        - 201 Created: Project created successfully
        - 400 Bad Request: Validation error
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            data = serializer.validated_data
            project = ProjectService.create_project(
                name=data['name'],
                description=data.get('description', ''),
                owner=request.user,
                is_active=data.get('is_active', True)
            )
            response_serializer = self.get_serializer(project)
            return Response(
                {"message": "Project created successfully", "data": response_serializer.data},
                status=status.HTTP_201_CREATED
            )
        except BusinessLogicException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['post'], serializer_class=ProjectMemberSerializer)
    def add_member(self, request, pk=None):
        """
        Add a member to the project.
        
        Request body:
        - user_id (required): ID of user to add
        
        Returns:
        - 200 OK: Member added successfully
        - 400 Bad Request: Validation error or business logic error
        - 404 Not Found: Project or user not found
        """
        project = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            user_id = serializer.validated_data['user_id']
            user = User.objects.get(id=user_id)
            ProjectService.add_member(project, user, request.user)
            return Response(
                {"message": "Member added successfully"},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return Response(
                {"message": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except BusinessLogicException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
```

## Authentication

- Use JWT tokens for authentication
- Include appropriate authorization headers
- Implement token refresh
- Handle expired tokens gracefully

## Documentation

- Document all endpoints using DRF Spectacular
- Include example requests and responses
- Document error responses
- Include authentication requirements
- Document required permissions

## Versioning

- Version APIs in the URL (e.g., `/api/v1/`)
- Maintain backward compatibility
- Deprecate old versions appropriately

Following these guidelines ensures a consistent, user-friendly, and maintainable API design throughout the project.
