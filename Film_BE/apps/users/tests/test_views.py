"""
Tests for users app views.
"""
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class TestLoginView(APITestCase):
    """Tests for LoginView."""

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )
        self.url = reverse("users:login")

    def test_login_success(self):
        """Test successful login."""
        data = {"username": "testuser", "password": "testpass123"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("user", response.data)
        self.assertEqual(response.data["user"]["username"], "testuser")

    def test_login_invalid_credentials(self):
        """Test login with invalid credentials."""
        data = {"username": "testuser", "password": "wrongpassword"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_missing_fields(self):
        """Test login with missing fields."""
        data = {"username": "testuser"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestRegisterView(APITestCase):
    """Tests for RegisterView."""

    def setUp(self):
        self.url = reverse("users:register")

    def test_register_success(self):
        """Test successful registration."""
        data = {
            "account": "newuser",
            "name": "New User",
            "gmail": "newuser@example.com",
            "password": "testpass123",
            "confirm_password": "testpass123",
        }
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("user", response.data)
        self.assertTrue(User.objects.filter(username="newuser").exists())

    def test_register_duplicate_account(self):
        """Test registration with duplicate account."""
        User.objects.create_user(
            username="existinguser",
            password="testpass123",
            email="existing@example.com",
        )

        data = {
            "account": "existinguser",
            "name": "New User",
            "gmail": "newuser@example.com",
            "password": "testpass123",
            "confirm_password": "testpass123",
        }
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_short_password(self):
        """Test registration with short password."""
        data = {
            "account": "newuser",
            "name": "New User",
            "gmail": "newuser@example.com",
            "password": "12345",
            "confirm_password": "12345",
        }
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestAccountView(APITestCase):
    """Tests for AccountView."""

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("users:account")

    def test_get_account_success(self):
        """Test getting account information."""
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)
        self.assertEqual(response.data["data"]["username"], "testuser")

    def test_get_account_with_username(self):
        """Test getting account by username."""
        url = f"{self.url}?currentAccount={self.user.username}"
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)

    def test_update_account_success(self):
        """Test updating account information."""
        data = {
            "pfId": self.user.id,
            "pfFName": "Updated",
            "pfLName": "Name",
            "pfEmail": "updated@example.com",
        }
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "Updated")
        self.assertEqual(self.user.last_name, "Name")
        self.assertEqual(self.user.email, "updated@example.com")

    def test_get_account_unauthorized(self):
        """Test getting account without authentication."""
        self.client.force_authenticate(user=None)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestLikeMovieView(APITestCase):
    """Tests for LikeMovieView."""

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("users:liked-movies")

    def test_get_liked_movies(self):
        """Test getting liked movies."""
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)

    def test_like_movie_unauthorized(self):
        """Test liking movie without authentication."""
        self.client.force_authenticate(user=None)
        data = {"movieName": "Test Movie"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
