"""
Custom permission classes for authorization.
"""

from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        """
        Read permissions are allowed to any request.
        Write permissions are only allowed to the owner of the object.
        """
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner
        if hasattr(obj, "owner"):
            return obj.owner == request.user
        if hasattr(obj, "created_by"):
            return obj.created_by == request.user
        if hasattr(obj, "user"):
            return obj.user == request.user

        return False


class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow read-only access to unauthenticated users,
    and full access to authenticated users.
    """

    def has_permission(self, request, view):
        """
        Allow read-only access to unauthenticated users.
        Allow full access to authenticated users.
        """
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user and request.user.is_authenticated


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to access it.
    """

    def has_object_permission(self, request, view, obj):
        """
        Only allow access to the owner of the object.
        """
        if hasattr(obj, "owner"):
            return obj.owner == request.user
        if hasattr(obj, "created_by"):
            return obj.created_by == request.user
        if hasattr(obj, "user"):
            return obj.user == request.user

        return False
