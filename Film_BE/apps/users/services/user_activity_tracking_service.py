"""
Service for tracking user activities.
"""

import logging

from django.contrib.auth.models import User

from apps.core.exceptions import ResourceNotFoundException
from apps.movies.models import Movieinformation
from apps.users.models import FollowFilmUser

logger = logging.getLogger(__name__)


class UserActivityTrackingService:
    """Service for tracking user activities."""

    # Activity type to rating mapping
    ACTIVITY_RATINGS = {
        "VIEW_DETAIL": 5,
        "CLICK_CARD": 3,
        "VIEW_TRAILER": 4,
        "SEARCH_CLICK": 2,
    }

    @staticmethod
    def track_activity(username: str, movie_name: str, activity_type: str) -> None:
        """
        Track user activity and write to CSV for recommendation system.

        Args:
            username: The username
            movie_name: The movie name
            activity_type: Type of activity (VIEW_DETAIL, CLICK_CARD, VIEW_TRAILER, SEARCH_CLICK)

        Raises:
            ResourceNotFoundException: If user or movie is not found
        """
        # Verify user exists
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise ResourceNotFoundException(f"User '{username}' not found.")

        # Verify movie exists
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
        except Movieinformation.DoesNotExist:
            raise ResourceNotFoundException(f"Movie '{movie_name}' not found.")

        # Get rating for activity type
        activity_rating = UserActivityTrackingService.ACTIVITY_RATINGS.get(activity_type)
        if activity_rating is None:
            logger.warning(f"Unknown activity type: {activity_type}")
            return

        # Update or create FollowFilmUser with aggregate rating
        try:
            follow_film_user, created = FollowFilmUser.objects.get_or_create(
                user=user, movie=movie_info, defaults={"total_view": 0, "aggregate_rating": 0}
            )

            # Update total_view if VIEW_DETAIL
            if activity_type == "VIEW_DETAIL":
                follow_film_user.total_view += 1

            # Update aggregate_rating: take max of current rating and new activity rating
            follow_film_user.aggregate_rating = max(follow_film_user.aggregate_rating, activity_rating)
            follow_film_user.save()
        except Exception as e:
            logger.warning(
                f"Failed to update FollowFilmUser: {str(e)}",
                exc_info=True,
                extra={"username": username, "movie_id": movie_info.movie_id, "activity_type": activity_type},
            )
