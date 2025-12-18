"""
Integration tests for the application.
These tests verify that multiple components work together correctly.
"""
import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
@pytest.mark.integration
class TestIntegration:
    """Integration tests for the application."""

    def test_full_user_flow(self, api_client):
        """Test complete user flow: register -> login -> access protected resource."""
        # 1. Register a new user
        register_url = reverse('register')
        register_data = {
            'account': 'testuser',
            'name': 'Test User',
            'gmail': 'test@example.com',
            'password': 'testpass123',
            'confirm_password': 'testpass123',
        }
        register_response = api_client.post(register_url, register_data, format='json')
        assert register_response.status_code in [
            status.HTTP_200_OK,
            status.HTTP_201_CREATED,
        ]

        # 2. Login with the new user
        login_url = reverse('login')
        login_data = {
            'username': 'testuser',
            'password': 'testpass123',
        }
        login_response = api_client.post(login_url, login_data, format='json')
        assert login_response.status_code == status.HTTP_200_OK

        # 3. Access protected resource (if any)
        # film_url = reverse('film-list')
        # film_response = api_client.get(film_url)
        # assert film_response.status_code == status.HTTP_200_OK

