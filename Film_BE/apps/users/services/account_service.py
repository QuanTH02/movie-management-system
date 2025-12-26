"""
Service for user account management operations.
"""

from typing import Optional

from django.contrib.auth.models import User

from apps.core.exceptions import ResourceNotFoundException


class AccountService:
    """Service for managing user accounts."""

    @staticmethod
    def get_user_by_username(username: str) -> User:
        """
        Get a user by username.

        Args:
            username: The username

        Returns:
            User object

        Raises:
            ResourceNotFoundException: If user is not found
        """
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise ResourceNotFoundException(f"User with username '{username}' not found.")

    @staticmethod
    def get_user_by_id(user_id: int) -> User:
        """
        Get a user by ID.

        Args:
            user_id: The user ID

        Returns:
            User object

        Raises:
            ResourceNotFoundException: If user is not found
        """
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise ResourceNotFoundException(f"User with ID '{user_id}' not found.")

    @staticmethod
    def update_user_profile(
        user_id: int,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        email: Optional[str] = None,
    ) -> User:
        """
        Update user profile information.

        Args:
            user_id: The user ID
            first_name: The first name (optional)
            last_name: The last name (optional)
            email: The email (optional)

        Returns:
            Updated User object

        Raises:
            ResourceNotFoundException: If user is not found
        """
        user = AccountService.get_user_by_id(user_id)

        if first_name is not None:
            user.first_name = first_name
        if last_name is not None:
            user.last_name = last_name
        if email is not None:
            user.email = email

        user.save()
        return user
