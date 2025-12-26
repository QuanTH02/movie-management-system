"""
Service for user authentication operations.
"""

from typing import Any, Dict, Optional

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone

from apps.core.exceptions import BusinessLogicException, ResourceNotFoundException


class AuthenticationService:
    """Service for handling user authentication."""

    @staticmethod
    def authenticate_user(username: str, password: str) -> Optional[User]:
        """
        Authenticate a user with username and password.

        Args:
            username: The username
            password: The password

        Returns:
            User object if authentication succeeds, None otherwise
        """
        return authenticate(username=username, password=password)

    @staticmethod
    def register_user(
        account: str,
        name: str,
        gmail: str,
        password: str,
    ) -> User:
        """
        Register a new user.

        Args:
            account: The username
            name: The user's name (stored in last_name)
            gmail: The user's email
            password: The user's password

        Returns:
            The created User object

        Raises:
            BusinessLogicException: If account already exists or password is too short
        """
        # Check if the account already exists
        if User.objects.filter(username=account).exists():
            raise BusinessLogicException("Account already exists.")

        # Check if the password has at least 6 characters
        if len(password) < 6:
            raise BusinessLogicException("Password must be at least 6 characters.")

        # Create a new user
        user = User(
            username=account,
            email=gmail,
            last_name=name,
            last_login=timezone.now(),
        )
        user.set_password(password)
        user.save()

        return user
