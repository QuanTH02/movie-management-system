"""
Service for movie recommendation operations.
"""

import logging
from typing import List, Optional, Union

from django.contrib.auth.models import User

from apps.core.exceptions import BusinessLogicException, ResourceNotFoundException
from apps.movies.models import Movieinformation
from apps.movies.services.movie_query_service import MovieQueryService

logger = logging.getLogger(__name__)

# Import recommendation functions
try:
    from App_Film_BE.Reconmmendation.Collaborative.load_model import recommend_collaborative_by_user_id
    from App_Film_BE.Reconmmendation.Content_Based.load_model import recommend_content_based_by_movie_id
except ImportError:
    logger.warning("Recommendation modules not found. Using fallback functions.")

    # Fallback if imports fail
    def recommend_collaborative_by_user_id(user_id: int) -> List[int]:
        return []

    def recommend_content_based_by_movie_id(movie_id: int) -> List[int]:
        return []


class RecommendationService:
    """Service for movie recommendations."""

    @staticmethod
    def get_content_based_recommendations(
        movie_identifier: Union[int, str], limit: Optional[int] = None
    ) -> List[Movieinformation]:
        """
        Get content-based recommendations for a movie.

        Args:
            movie_identifier: Movie ID (int) or movie name (str)
            limit: Maximum number of recommendations (optional)

        Returns:
            List of recommended Movieinformation objects

        Raises:
            ResourceNotFoundException: If movie is not found
        """
        movie = MovieQueryService.get_movie_by_id_or_name(movie_identifier)
        movie_id = movie.movie_id

        try:
            recommended_ids = recommend_content_based_by_movie_id(movie_id)
            if limit:
                recommended_ids = recommended_ids[:limit]
            return MovieQueryService.get_movies_by_ids(recommended_ids, preserve_order=True)
        except ResourceNotFoundException:
            raise
        except Exception as e:
            logger.error(
                f"Error getting content-based recommendations for movie {movie_id}: {str(e)}",
                exc_info=True,
                extra={"movie_id": movie_id},
            )
            raise BusinessLogicException(f"Error getting content-based recommendations: {str(e)}")

    @staticmethod
    def get_collaborative_recommendations(user_identifier: Union[int, str], limit: int = 12) -> List[Movieinformation]:
        """
        Get collaborative filtering recommendations for a user.

        Args:
            user_identifier: User ID (int) or username (str)
            limit: Maximum number of recommendations

        Returns:
            List of recommended Movieinformation objects

        Raises:
            ResourceNotFoundException: If user is not found
        """
        # Get user ID
        if isinstance(user_identifier, int) or (isinstance(user_identifier, str) and user_identifier.isdigit()):
            user_id = int(user_identifier)
        else:
            try:
                user = User.objects.get(username=user_identifier)
                user_id = user.id
            except User.DoesNotExist:
                raise ResourceNotFoundException(f"User '{user_identifier}' not found.")

        try:
            recommended_ids = recommend_collaborative_by_user_id(user_id)
            recommended_ids = recommended_ids[:limit]
            return MovieQueryService.get_movies_by_ids(recommended_ids, preserve_order=True)
        except ResourceNotFoundException:
            raise
        except Exception as e:
            logger.error(
                f"Error getting collaborative recommendations for user {user_id}: {str(e)}",
                exc_info=True,
                extra={"user_id": user_id},
            )
            raise BusinessLogicException(f"Error getting collaborative recommendations: {str(e)}")
