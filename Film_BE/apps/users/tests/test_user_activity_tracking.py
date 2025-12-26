"""
Tests for user activity tracking service and view.
"""

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.core.exceptions import ResourceNotFoundException
from apps.movies.models import Movieinformation
from apps.users.models import FollowFilmUser
from apps.users.services.user_activity_tracking_service import UserActivityTrackingService

User = get_user_model()


class TestUserActivityTrackingService(TestCase):
    """Tests for UserActivityTrackingService."""

    def setUp(self):
        """Set up test data."""
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
        )
        self.movie = Movieinformation.objects.create(
            movie_id=1,
            movie_name="Test Movie",
        )

    def test_track_activity_view_detail(self):
        """Test tracking VIEW_DETAIL activity."""
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "VIEW_DETAIL")

        # Check FollowFilmUser was created, total_view and aggregate_rating were updated
        follow_film_user = FollowFilmUser.objects.get(user=self.user, movie=self.movie)
        self.assertEqual(follow_film_user.total_view, 1)
        self.assertEqual(follow_film_user.aggregate_rating, 5)  # VIEW_DETAIL rating is 5

    def test_track_activity_view_detail_multiple_times(self):
        """Test tracking VIEW_DETAIL activity multiple times."""
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "VIEW_DETAIL")
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "VIEW_DETAIL")

        follow_film_user = FollowFilmUser.objects.get(user=self.user, movie=self.movie)
        self.assertEqual(follow_film_user.total_view, 2)
        self.assertEqual(follow_film_user.aggregate_rating, 5)  # Should remain max rating

    def test_track_activity_click_card(self):
        """Test tracking CLICK_CARD activity."""
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "CLICK_CARD")

        # CLICK_CARD should create FollowFilmUser with aggregate_rating
        follow_film_user = FollowFilmUser.objects.get(user=self.user, movie=self.movie)
        self.assertEqual(follow_film_user.aggregate_rating, 3)  # CLICK_CARD rating is 3
        self.assertEqual(follow_film_user.total_view, 0)  # Should not increment total_view

    def test_track_activity_view_trailer(self):
        """Test tracking VIEW_TRAILER activity."""
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "VIEW_TRAILER")

        # VIEW_TRAILER should create FollowFilmUser with aggregate_rating
        follow_film_user = FollowFilmUser.objects.get(user=self.user, movie=self.movie)
        self.assertEqual(follow_film_user.aggregate_rating, 4)  # VIEW_TRAILER rating is 4

    def test_track_activity_search_click(self):
        """Test tracking SEARCH_CLICK activity."""
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "SEARCH_CLICK")

        # SEARCH_CLICK should create FollowFilmUser with aggregate_rating
        follow_film_user = FollowFilmUser.objects.get(user=self.user, movie=self.movie)
        self.assertEqual(follow_film_user.aggregate_rating, 2)  # SEARCH_CLICK rating is 2

    def test_track_activity_user_not_found(self):
        """Test tracking activity with non-existent user."""
        with self.assertRaises(ResourceNotFoundException):
            UserActivityTrackingService.track_activity("nonexistent", self.movie.movie_name, "VIEW_DETAIL")

    def test_track_activity_movie_not_found(self):
        """Test tracking activity with non-existent movie."""
        with self.assertRaises(ResourceNotFoundException):
            UserActivityTrackingService.track_activity(self.user.username, "Nonexistent Movie", "VIEW_DETAIL")

    def test_track_activity_unknown_type(self):
        """Test tracking activity with unknown activity type."""
        # Should not raise exception, just log warning
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "UNKNOWN_TYPE")

    def test_track_activity_aggregate_rating_max(self):
        """Test that aggregate_rating takes max of all activities."""
        # Track lower rating first
        UserActivityTrackingService.track_activity(
            self.user.username, self.movie.movie_name, "SEARCH_CLICK"
        )  # rating: 2
        follow_film_user = FollowFilmUser.objects.get(user=self.user, movie=self.movie)
        self.assertEqual(follow_film_user.aggregate_rating, 2)

        # Track higher rating - should update to max
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "CLICK_CARD")  # rating: 3
        follow_film_user.refresh_from_db()
        self.assertEqual(follow_film_user.aggregate_rating, 3)

        # Track even higher rating - should update to max
        UserActivityTrackingService.track_activity(
            self.user.username, self.movie.movie_name, "VIEW_TRAILER"
        )  # rating: 4
        follow_film_user.refresh_from_db()
        self.assertEqual(follow_film_user.aggregate_rating, 4)

        # Track highest rating - should update to max
        UserActivityTrackingService.track_activity(
            self.user.username, self.movie.movie_name, "VIEW_DETAIL"
        )  # rating: 5
        follow_film_user.refresh_from_db()
        self.assertEqual(follow_film_user.aggregate_rating, 5)

        # Track lower rating again - should keep max (5)
        UserActivityTrackingService.track_activity(self.user.username, self.movie.movie_name, "CLICK_CARD")  # rating: 3
        follow_film_user.refresh_from_db()
        self.assertEqual(follow_film_user.aggregate_rating, 5)


class TestTrackActivityView(APITestCase):
    """Tests for TrackActivityView."""

    def setUp(self):
        """Set up test data."""
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
        self.url = reverse("users:track-activity")

    def test_track_activity_view_detail_success(self):
        """Test tracking VIEW_DETAIL activity via API."""
        data = {"movieName": self.movie.movie_name, "activityType": "VIEW_DETAIL"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "Activity tracked successfully.")

        # Check FollowFilmUser was created
        follow_film_user = FollowFilmUser.objects.get(user=self.user, movie=self.movie)
        self.assertEqual(follow_film_user.total_view, 1)
        self.assertEqual(follow_film_user.aggregate_rating, 5)  # VIEW_DETAIL rating is 5

    def test_track_activity_click_card_success(self):
        """Test tracking CLICK_CARD activity via API."""
        data = {"movieName": self.movie.movie_name, "activityType": "CLICK_CARD"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_track_activity_unauthorized(self):
        """Test tracking activity without authentication."""
        self.client.force_authenticate(user=None)
        data = {"movieName": self.movie.movie_name, "activityType": "VIEW_DETAIL"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_track_activity_invalid_input(self):
        """Test tracking activity with invalid input."""
        data = {"movieName": ""}  # Missing activityType
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("errors", response.data)

    def test_track_activity_invalid_activity_type(self):
        """Test tracking activity with invalid activity type."""
        data = {"movieName": self.movie.movie_name, "activityType": "INVALID_TYPE"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_track_activity_movie_not_found(self):
        """Test tracking activity with non-existent movie."""
        data = {"movieName": "Nonexistent Movie", "activityType": "VIEW_DETAIL"}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
