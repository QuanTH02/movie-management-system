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

```python
class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing projects.
    """
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsProjectMemberOrOwner]

    def get_queryset(self):
        return Project.objects.filter(
            members=self.request.user
        ).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, created_by=self.request.user)
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
