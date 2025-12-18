"""
Example tests for Django views/API endpoints.
This demonstrates how to test API endpoints with pytest-django.
"""
import pytest
from django.urls import reverse
from rest_framework import status
from faker import Faker

fake = Faker()


@pytest.mark.django_db
@pytest.mark.api
class TestFilmListView:
    """Tests for Film List API endpoint."""

    def test_get_film_list_success(self, api_client):
        """Test successful retrieval of film list."""
        url = reverse('film-list')
        response = api_client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.data, list)

    def test_get_film_list_with_authentication(self, authenticated_api_client):
        """Test film list retrieval with authenticated user."""
        url = reverse('film-list')
        response = authenticated_api_client.get(url)

        assert response.status_code == status.HTTP_200_OK


@pytest.mark.django_db
@pytest.mark.api
class TestLoginView:
    """Tests for Login API endpoint."""

    def test_login_with_valid_credentials(self, api_client, user):
        """Test login with valid username and password."""
        url = reverse('login')
        data = {
            'username': user.username,
            'password': 'testpass123',
        }
        response = api_client.post(url, data, format='json')

        assert response.status_code == status.HTTP_200_OK
        assert 'message' in response.data

    def test_login_with_invalid_credentials(self, api_client):
        """Test login with invalid credentials."""
        url = reverse('login')
        data = {
            'username': 'nonexistent',
            'password': 'wrongpassword',
        }
        response = api_client.post(url, data, format='json')

        assert response.status_code in [
            status.HTTP_400_BAD_REQUEST,
            status.HTTP_401_UNAUTHORIZED,
        ]


@pytest.mark.django_db
@pytest.mark.api
class TestTicketRoomView:
    """Tests for Ticket Room API endpoint."""

    def test_get_ticketroom_list(self, api_client):
        """Test successful retrieval of ticket room list."""
        url = reverse('ticketroom-list')
        response = api_client.get(url)

        assert response.status_code == status.HTTP_200_OK
        assert isinstance(response.data, list)


@pytest.mark.django_db
@pytest.mark.api
class TestRecommendCollaborativeView:
    """Tests for Collaborative Recommendation API endpoint."""

    def test_get_recommendations(self, api_client):
        """Test getting recommendations for a user."""
        url = reverse('recommend-collaborative-movies', kwargs={'user_id': 'admin'})
        response = api_client.get(url)

        assert response.status_code == status.HTTP_200_OK

