"""
Service for like movie operations.
"""

import csv
import logging
from typing import List

from django.contrib.auth.models import User

from apps.core.exceptions import BusinessLogicException, ResourceNotFoundException
from apps.movies.models import Movieinformation
from apps.users.models import LikeMovie

logger = logging.getLogger(__name__)


class LikeMovieService:
    """Service for managing movie likes."""

    CSV_FILE_PATH = "App_Film_BE/Reconmmendation/Collaborative/output.csv"

    @staticmethod
    def get_liked_movies_by_username(username: str) -> List[Movieinformation]:
        """
        Get all movies liked by a user.

        Args:
            username: The username

        Returns:
            List of Movieinformation objects
        """
        list_like_movie_ids = LikeMovie.objects.filter(user_name=username)
        list_movie_ids = list_like_movie_ids.values_list("movie_id", flat=True)
        return list(Movieinformation.objects.filter(movie_id__in=list_movie_ids))

    @staticmethod
    def like_movie(username: str, movie_name: str) -> None:
        """
        Like a movie for a user.

        Args:
            username: The username
            movie_name: The movie name

        Raises:
            ResourceNotFoundException: If user or movie is not found
            BusinessLogicException: If user has already liked this movie
        """
        # Verify user exists
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            raise ResourceNotFoundException(f"User '{username}' not found.")

        # Verify movie exists
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
        except Movieinformation.DoesNotExist:
            raise ResourceNotFoundException(f"Movie '{movie_name}' not found.")

        # Check if already liked
        if LikeMovie.objects.filter(user_name=username, movie_id=movie_info.movie_id).exists():
            raise BusinessLogicException("User has already liked this movie.")

        # Create like record
        LikeMovie.objects.create(user_name=username, movie_id=movie_info.movie_id)

        # Write to CSV for recommendation system
        try:
            with open(LikeMovieService.CSV_FILE_PATH, "a", newline="") as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow([username, movie_info.movie_id, 10])
        except Exception as e:
            # Log error but don't fail the operation
            logger.warning(
                f"Failed to write like to CSV: {str(e)}",
                exc_info=True,
                extra={"username": username, "movie_id": movie_info.movie_id},
            )

    @staticmethod
    def unlike_movie(username: str, movie_name: str) -> None:
        """
        Unlike a movie for a user.

        Args:
            username: The username
            movie_name: The movie name

        Raises:
            ResourceNotFoundException: If user, movie, or like record is not found
        """
        # Verify user exists
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            raise ResourceNotFoundException(f"User '{username}' not found.")

        # Verify movie exists
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
        except Movieinformation.DoesNotExist:
            raise ResourceNotFoundException(f"Movie '{movie_name}' not found.")

        # Get and delete like record
        try:
            like_instance = LikeMovie.objects.get(user_name=username, movie_id=movie_info.movie_id)
            like_instance.delete()
        except LikeMovie.DoesNotExist:
            raise BusinessLogicException("User has not liked this movie.")
