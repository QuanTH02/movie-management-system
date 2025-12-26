"""
Tests for users app services.
"""
from django.contrib.auth import get_user_model
from django.test import TestCase

from apps.core.exceptions import BusinessLogicException, ResourceNotFoundException
from apps.users.services.authentication_service import AuthenticationService
from apps.users.services.account_service import AccountService

User = get_user_model()


class TestAuthenticationService(TestCase):
    """Tests for AuthenticationService."""

    def test_authenticate_user_success(self):
        """Test successful user authentication."""
        user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )

        authenticated_user = AuthenticationService.authenticate_user("testuser", "testpass123")

        self.assertIsNotNone(authenticated_user)
        self.assertEqual(authenticated_user.username, "testuser")

    def test_authenticate_user_invalid_credentials(self):
        """Test authentication with invalid credentials."""
        User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )

        authenticated_user = AuthenticationService.authenticate_user("testuser", "wrongpassword")

        self.assertIsNone(authenticated_user)

    def test_register_user_success(self):
        """Test successful user registration."""
        user = AuthenticationService.register_user(
            account="newuser",
            name="New User",
            gmail="newuser@example.com",
            password="testpass123",
        )

        self.assertEqual(user.username, "newuser")
        self.assertEqual(user.email, "newuser@example.com")
        self.assertTrue(User.objects.filter(username="newuser").exists())

    def test_register_user_duplicate_account(self):
        """Test registration with duplicate account."""
        User.objects.create_user(
            username="existinguser",
            password="testpass123",
            email="existing@example.com",
        )

        with self.assertRaises(BusinessLogicException):
            AuthenticationService.register_user(
                account="existinguser",
                name="New User",
                gmail="newuser@example.com",
                password="testpass123",
            )

    def test_register_user_short_password(self):
        """Test registration with short password."""
        with self.assertRaises(BusinessLogicException):
            AuthenticationService.register_user(
                account="newuser",
                name="New User",
                gmail="newuser@example.com",
                password="12345",
            )


class TestAccountService(TestCase):
    """Tests for AccountService."""

    def test_get_user_by_username_success(self):
        """Test getting user by username."""
        user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )

        found_user = AccountService.get_user_by_username("testuser")

        self.assertEqual(found_user.username, "testuser")

    def test_get_user_by_username_not_found(self):
        """Test getting non-existent user by username."""
        with self.assertRaises(ResourceNotFoundException):
            AccountService.get_user_by_username("nonexistent")

    def test_get_user_by_id_success(self):
        """Test getting user by ID."""
        user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )

        found_user = AccountService.get_user_by_id(user.id)

        self.assertEqual(found_user.id, user.id)

    def test_get_user_by_id_not_found(self):
        """Test getting non-existent user by ID."""
        with self.assertRaises(ResourceNotFoundException):
            AccountService.get_user_by_id(99999)

    def test_update_user_profile_success(self):
        """Test updating user profile."""
        user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )

        updated_user = AccountService.update_user_profile(
            user_id=user.id,
            first_name="Updated",
            last_name="Name",
            email="updated@example.com",
        )

        self.assertEqual(updated_user.first_name, "Updated")
        self.assertEqual(updated_user.last_name, "Name")
        self.assertEqual(updated_user.email, "updated@example.com")
