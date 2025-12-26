"""
Tests for movies app views.
"""
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.movies.models import Movieinformation


class TestFilmListView(APITestCase):
    """Tests for FilmListView."""

    def setUp(self):
        self.url = reverse("movies:film-list")

    def test_list_movies_success(self):
        """Test listing all movies."""
        Movieinformation.objects.create(
            movie_id=1,
            movie_name="Test Movie 1",
        )
        Movieinformation.objects.create(
            movie_id=2,
            movie_name="Test Movie 2",
        )

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)
        self.assertEqual(len(response.data["data"]), 2)

    def test_list_movies_empty(self):
        """Test listing movies when none exist."""
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)
        self.assertEqual(len(response.data["data"]), 0)


class TestMovieDetailView(APITestCase):
    """Tests for MovieDetailView."""

    def setUp(self):
        self.movie = Movieinformation.objects.create(
            movie_id=1,
            movie_name="Test Movie",
        )

    def test_get_movie_by_id_success(self):
        """Test getting movie by ID."""
        url = reverse("movies:movie-detail", kwargs={"movie_id": self.movie.movie_id})
        response = self.client.post(url, {}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)
        self.assertEqual(response.data["data"]["movie_name"], "Test Movie")

    def test_get_movie_by_name_success(self):
        """Test getting movie by name."""
        url = reverse("movies:movie-detail", kwargs={"movie_id": self.movie.movie_name})
        response = self.client.post(url, {}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)

    def test_get_movie_not_found(self):
        """Test getting non-existent movie."""
        url = reverse("movies:movie-detail", kwargs={"movie_id": "99999"})
        response = self.client.post(url, {}, format="json")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TestTicketRoomListView(APITestCase):
    """Tests for TicketRoomListView."""

    def setUp(self):
        self.url = reverse("movies:ticket-room-list")

    def test_list_ticket_rooms_success(self):
        """Test listing ticket rooms."""
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)
