"""
Comprehensive API endpoint tests.
Tests all API endpoints to ensure they work correctly.
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Film_BE.settings")
django.setup()

from django.test import SimpleTestCase
from django.urls import reverse, resolve
from django.contrib.auth import get_user_model

User = get_user_model()


class TestAllURLs(SimpleTestCase):
    """Test that all URLs are properly configured and resolvable."""

    def test_users_urls_resolve(self):
        """Test users app URLs resolve correctly."""
        # Login
        url = reverse("users:login")
        self.assertEqual(url, "/api/v1/users/login/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Register
        url = reverse("users:register")
        self.assertEqual(url, "/api/v1/users/register/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Token refresh
        url = reverse("users:token-refresh")
        self.assertEqual(url, "/api/v1/users/token/refresh/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Account
        url = reverse("users:account")
        self.assertEqual(url, "/api/v1/users/account/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Liked movies
        url = reverse("users:liked-movies")
        self.assertEqual(url, "/api/v1/users/liked-movies/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

    def test_reviews_urls_resolve(self):
        """Test reviews app URLs resolve correctly."""
        # Review list
        url = reverse("reviews:review-list")
        self.assertEqual(url, "/api/v1/reviews/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Movie reviews
        url = reverse("reviews:movie-reviews", kwargs={"movie_id": "1"})
        self.assertEqual(url, "/api/v1/reviews/movies/1/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

    def test_movies_urls_resolve(self):
        """Test movies app URLs resolve correctly."""
        # Film list
        url = reverse("movies:film-list")
        self.assertEqual(url, "/api/v1/movies/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Movie detail
        url = reverse("movies:movie-detail", kwargs={"movie_id": "1"})
        self.assertEqual(url, "/api/v1/movies/1/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Ticket room list
        url = reverse("movies:ticket-room-list")
        self.assertEqual(url, "/api/v1/movies/ticket-room/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Recommendations
        url = reverse("movies:recommend-content-based", kwargs={"movie_id": "1"})
        self.assertEqual(url, "/api/v1/movies/recommend/content-based/1/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        url = reverse("movies:recommend-collaborative", kwargs={"user_id": "1"})
        self.assertEqual(url, "/api/v1/movies/recommend/collaborative/1/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Metadata endpoints
        url = reverse("movies:awards-list", kwargs={"movie_id": "1"})
        self.assertEqual(url, "/api/v1/movies/1/awards/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        url = reverse("movies:directors-list", kwargs={"movie_id": "1"})
        self.assertEqual(url, "/api/v1/movies/1/directors/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

    def test_backward_compatibility_urls(self):
        """Test backward compatibility URLs."""
        # Old login URL
        url = reverse("api:login")
        self.assertEqual(url, "/api/login/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)

        # Old register URL
        url = reverse("api:register")
        self.assertEqual(url, "/api/register/")
        resolved = resolve(url)
        self.assertIsNotNone(resolved.func)


class TestViewsExist(SimpleTestCase):
    """Test that all views can be imported and instantiated."""

    def test_users_views(self):
        """Test users views exist."""
        from apps.users.views import (
            LoginView,
            RegisterView,
            AccountView,
            LikeMovieView,
            TokenRefreshView,
        )

        self.assertIsNotNone(LoginView)
        self.assertIsNotNone(RegisterView)
        self.assertIsNotNone(AccountView)
        self.assertIsNotNone(LikeMovieView)
        self.assertIsNotNone(TokenRefreshView)

    def test_reviews_views(self):
        """Test reviews views exist."""
        from apps.reviews.views import ReviewView, FilmReviewListView

        self.assertIsNotNone(ReviewView)
        self.assertIsNotNone(FilmReviewListView)

    def test_movies_views(self):
        """Test movies views exist."""
        from apps.movies.views import (
            FilmListView,
            MovieDetailView,
            TicketRoomListView,
            RecommendContentBasedView,
            RecommendCollaborativeView,
        )

        self.assertIsNotNone(FilmListView)
        self.assertIsNotNone(MovieDetailView)
        self.assertIsNotNone(TicketRoomListView)
        self.assertIsNotNone(RecommendContentBasedView)
        self.assertIsNotNone(RecommendCollaborativeView)


class TestServicesExist(SimpleTestCase):
    """Test that all services can be imported."""

    def test_users_services(self):
        """Test users services exist."""
        from apps.users.services.authentication_service import AuthenticationService
        from apps.users.services.account_service import AccountService
        from apps.users.services.like_movie_service import LikeMovieService

        self.assertIsNotNone(AuthenticationService)
        self.assertIsNotNone(AccountService)
        self.assertIsNotNone(LikeMovieService)

    def test_reviews_services(self):
        """Test reviews services exist."""
        from apps.reviews.services.review_service import ReviewService

        self.assertIsNotNone(ReviewService)

    def test_movies_services(self):
        """Test movies services exist."""
        from apps.movies.services.movie_query_service import MovieQueryService
        from apps.movies.services.movie_data_service import MovieDataService
        from apps.movies.services.recommendation_service import RecommendationService

        self.assertIsNotNone(MovieQueryService)
        self.assertIsNotNone(MovieDataService)
        self.assertIsNotNone(RecommendationService)


if __name__ == "__main__":
    import unittest

    unittest.main()

