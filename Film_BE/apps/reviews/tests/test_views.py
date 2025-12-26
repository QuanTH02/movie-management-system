"""
Tests for reviews app views.
"""
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.movies.models import Movieinformation
from apps.reviews.models import FilmReview

User = get_user_model()


class TestReviewView(APITestCase):
    """Tests for ReviewView."""

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )
        self.client.force_authenticate(user=self.user)
        self.movie = Movieinformation.objects.create(
            movie_id=1,
            movie_name="Test Movie",
        )
        self.url = reverse("reviews:review-list")

    def test_create_review_success(self):
        """Test creating a review."""
        data = {
            "movie": "Test Movie",
            "star_review": "5",
            "title_review": "Great Movie",
            "content_review": "This is a great movie!",
            "name_review": "testuser",
        }
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(FilmReview.objects.filter(movie_id=self.movie.movie_id).exists())

    def test_create_review_missing_movie(self):
        """Test creating review without movie."""
        data = {
            "star_review": "5",
            "title_review": "Great Movie",
            "content_review": "This is a great movie!",
            "name_review": "testuser",
        }
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_review_unauthorized(self):
        """Test creating review without authentication."""
        self.client.force_authenticate(user=None)
        data = {
            "movie": "Test Movie",
            "star_review": "5",
            "title_review": "Great Movie",
            "content_review": "This is a great movie!",
            "name_review": "testuser",
        }
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_review_success(self):
        """Test deleting a review."""
        review = FilmReview.objects.create(
            film_review_id=1,
            movie_id=self.movie.movie_id,
            star_review="5",
            title_review="Great Movie",
            content_review="This is a great movie!",
            name_review="testuser",
        )

        data = {"film_review_id": review.film_review_id}
        response = self.client.delete(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(FilmReview.objects.filter(film_review_id=review.film_review_id).exists())


class TestFilmReviewListView(APITestCase):
    """Tests for FilmReviewListView."""

    def setUp(self):
        self.movie = Movieinformation.objects.create(
            movie_id=1,
            movie_name="Test Movie",
        )

    def test_list_reviews_success(self):
        """Test listing reviews for a movie."""
        FilmReview.objects.create(
            film_review_id=1,
            movie_id=self.movie.movie_id,
            star_review="5",
            title_review="Great Movie",
            content_review="This is a great movie!",
            name_review="testuser",
        )

        url = reverse("reviews:movie-reviews", kwargs={"movie_id": self.movie.movie_id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("data", response.data)
        self.assertEqual(len(response.data["data"]), 1)
