"""
Service for movie query operations.
"""

from typing import List, Union

from apps.core.exceptions import ResourceNotFoundException
from apps.movies.models import Movieinformation


class MovieQueryService:
    """Service for querying movie data."""

    @staticmethod
    def get_movie_by_id_or_name(movie_identifier: Union[int, str]) -> Movieinformation:
        """
        Get a movie by ID or name.

        Args:
            movie_identifier: Movie ID (int) or movie name (str)

        Returns:
            Movieinformation object

        Raises:
            ResourceNotFoundException: If movie is not found
        """
        try:
            if isinstance(movie_identifier, int) or (isinstance(movie_identifier, str) and movie_identifier.isdigit()):
                movie_id = int(movie_identifier)
                return MovieQueryService.get_movie_by_id(movie_id)
            else:
                return MovieQueryService.get_movie_by_name(movie_identifier)
        except (ValueError, TypeError):
            return MovieQueryService.get_movie_by_name(movie_identifier)

    @staticmethod
    def get_movie_by_id(movie_id: int) -> Movieinformation:
        """
        Get a movie by ID.

        Args:
            movie_id: The movie ID

        Returns:
            Movieinformation object

        Raises:
            ResourceNotFoundException: If movie is not found
        """
        try:
            return Movieinformation.objects.get(movie_id=movie_id)
        except Movieinformation.DoesNotExist:
            raise ResourceNotFoundException(f"Movie with ID '{movie_id}' not found.")

    @staticmethod
    def get_movie_by_name(movie_name: str) -> Movieinformation:
        """
        Get a movie by name.

        Args:
            movie_name: The movie name

        Returns:
            Movieinformation object

        Raises:
            ResourceNotFoundException: If movie is not found
        """
        try:
            return Movieinformation.objects.get(movie_name=movie_name)
        except Movieinformation.DoesNotExist:
            raise ResourceNotFoundException(f"Movie '{movie_name}' not found.")

    @staticmethod
    def get_movies_by_ids(movie_ids: List[int], preserve_order: bool = False) -> List[Movieinformation]:
        """
        Get multiple movies by IDs.

        Args:
            movie_ids: List of movie IDs
            preserve_order: Whether to preserve the order of IDs

        Returns:
            List of Movieinformation objects
        """
        movies = Movieinformation.objects.filter(movie_id__in=movie_ids)

        if preserve_order:
            movie_dict = {movie.movie_id: movie for movie in movies}
            return [movie_dict[mid] for mid in movie_ids if mid in movie_dict]

        return list(movies)
