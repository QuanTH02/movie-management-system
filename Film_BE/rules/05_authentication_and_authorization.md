# Authentication and Authorization Guidelines

## Overview

This document outlines the standards and best practices for implementing authentication and authorization in our Django project. Proper authentication and authorization are critical for maintaining the security and integrity of our application.

## Authentication

### JWT Authentication

Our project uses JSON Web Tokens (JWT) for authentication through `rest_framework_simplejwt`. This provides:

- Stateless authentication
- Token-based access
- Expirable tokens
- Refresh token mechanism

### Token Configuration

```python
# Settings in settings.py
SIMPLE_JWT = {
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
}
```

### Custom Authentication

We use a custom JWT authentication class (`CustomJWTAuthentication`) to handle token validation and user identification:

```python
# Configuration in settings.py
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "aiWriting.authentication.CustomJWTAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    # other configurations...
}
```

### Authentication Endpoints

The following endpoints are available for authentication:

- `/api/token/` - Obtain JWT tokens
- `/api/token/refresh/` - Refresh JWT tokens
- `/api/users/register/` - Register a new user
- `/api/users/login/` - Login with credentials
- `/api/users/logout/` - Logout (invalidate token)

### Token Handling Best Practices

1. Store tokens securely on the client side
2. Implement token refresh mechanism
3. Clear tokens on logout
4. Set appropriate token expiration times
5. Include proper error handling for token validation failures

## Authorization

### Permission Classes

Use Django REST Framework's permission classes to control access to views and viewsets:

```python
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Write permissions are only allowed to the owner
        return obj.owner == request.user
```

### Usage in Views

```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.projects.permissions import IsProjectMember

class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsProjectMember]
    # ...
```

### Object-Level Permissions

Implement `has_permission` and `has_object_permission` methods in custom permission classes:

```python
class IsProjectMember(BasePermission):
    """
    Allow access only to project members.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.members.filter(id=request.user.id).exists() or obj.owner == request.user
```

## Role-Based Access Control

### User Roles

Define user roles either through groups or model fields:

```python
# Example in User model
class User(AbstractUser):
    ROLE_ADMIN = 'admin'
    ROLE_MANAGER = 'manager'
    ROLE_MEMBER = 'member'

    ROLE_CHOICES = [
        (ROLE_ADMIN, 'Admin'),
        (ROLE_MANAGER, 'Manager'),
        (ROLE_MEMBER, 'Member'),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=ROLE_MEMBER
    )
```

### Role-Based Permissions

Implement permission classes based on user roles:

```python
class IsManagerOrAdmin(BasePermission):
    """
    Allow access only to managers or admins.
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            request.user.role in [User.ROLE_MANAGER, User.ROLE_ADMIN]
        )
```

## Organization-Based Access Control

For multi-tenant applications, implement organization-based access control:

```python
class IsInSameOrganization(BasePermission):
    """
    Allow access only to users in the same organization.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is in the same organization as the object
        return (
            request.user.organization == obj.organization or
            request.user.is_superuser
        )
```

## Security Best Practices

1. **Principle of Least Privilege**: Grant the minimum permissions necessary
2. **Defense in Depth**: Implement multiple layers of security
3. **Regular Auditing**: Regularly audit access logs and permissions
4. **Secure Password Handling**: Use Django's built-in password hashing
5. **Input Validation**: Validate all input data
6. **HTTPS**: Use HTTPS for all communication
7. **Rate Limiting**: Implement rate limiting for authentication endpoints
8. **Secure Headers**: Set secure HTTP headers
9. **CSRF Protection**: Enable CSRF protection for relevant endpoints
10. **Logout Handling**: Properly handle user logout

## Example Authentication Flow

1. **Registration**:

   - User submits registration data
   - Validate data and create user account
   - Generate and return JWT tokens

2. **Login**:

   - User submits credentials
   - Validate credentials
   - Generate and return JWT tokens

3. **API Access**:

   - Client includes JWT token in Authorization header
   - Backend validates token
   - If valid, process request; otherwise, return 401 Unauthorized

4. **Token Refresh**:

   - Client uses refresh token to obtain new access token
   - Backend validates refresh token
   - If valid, issue new access token

5. **Logout**:
   - Client sends logout request
   - Backend invalidates tokens (if tracked)
   - Client removes tokens from storage

By following these authentication and authorization guidelines, we ensure our application remains secure while providing appropriate access control.
