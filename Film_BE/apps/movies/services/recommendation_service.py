"""
Service for movie recommendation operations.
"""

import logging
from collections import defaultdict
from typing import List, Optional, Union

from django.contrib.auth.models import User
from django.db.models import Q

from apps.core.exceptions import BusinessLogicException, ResourceNotFoundException
from apps.movies.models import Cast, Director, Genres, MovieCast, MovieDirector, MovieGenres, Movieinformation
from apps.movies.services.movie_query_service import MovieQueryService
from apps.users.models import FollowFilmUser

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

    @staticmethod
    def get_realtime_recommendations(
        user_identifier: Union[int, str], limit: int = 12, min_rating: int = 3
    ) -> List[Movieinformation]:
        """
        Get realtime recommendations for a user based on their activity tracking.
        No model training required - uses simple content-based matching.

        Algorithm:
        1. Find movies user has interacted with (aggregate_rating >= min_rating)
        2. Extract genres, directors, and cast from those movies
        3. Find other movies with matching attributes
        4. Score movies by number of matching attributes (weighted: genres > directors > cast)
        5. Exclude movies user has already seen
        6. Return top N recommendations

        Args:
            user_identifier: User ID (int) or username (str)
            limit: Maximum number of recommendations
            min_rating: Minimum aggregate_rating to consider a movie as "liked"

        Returns:
            List of recommended Movieinformation objects

        Raises:
            ResourceNotFoundException: If user is not found
        """
        # Get user
        if isinstance(user_identifier, int) or (isinstance(user_identifier, str) and user_identifier.isdigit()):
            try:
                user = User.objects.get(id=int(user_identifier))
            except User.DoesNotExist:
                raise ResourceNotFoundException(f"User with ID '{user_identifier}' not found.")
        else:
            try:
                user = User.objects.get(username=user_identifier)
            except User.DoesNotExist:
                raise ResourceNotFoundException(f"User '{user_identifier}' not found.")

        try:
            # Step 1: Get movies user has interacted with (aggregate_rating >= min_rating)
            # Include aggregate_rating to calculate preference weights
            user_interactions = (
                FollowFilmUser.objects.filter(user=user, aggregate_rating__gte=min_rating)
                .select_related("movie")
                .values("movie_id", "aggregate_rating")
            )

            if not user_interactions.exists():
                # No interactions yet, return empty list
                logger.info(f"No user interactions found for user {user.username} with rating >= {min_rating}")
                return []

            # Build mapping of movie_id to aggregate_rating for weight calculation
            movie_rating_map = {
                interaction["movie_id"]: interaction["aggregate_rating"] for interaction in user_interactions
            }
            user_movie_ids = set(movie_rating_map.keys())
            liked_movie_ids = list(user_movie_ids)

            # Calculate total rating for normalization
            total_rating = sum(movie_rating_map.values())

            # Step 2: Extract genres, directors, and cast from user's liked movies
            # Weight each movie's attributes by its aggregate_rating
            # Match by NAME instead of ID to handle database structure issues
            genre_name_weights = defaultdict(float)
            director_name_weights = defaultdict(float)
            cast_name_weights = defaultdict(float)

            # Get all genres, directors, cast with their weights (by name)
            for movie_id, rating in movie_rating_map.items():
                # Normalize rating weight (0-1 scale based on relative preference)
                weight = rating / total_rating if total_rating > 0 else 1.0 / len(user_movie_ids)

                # Get genres for this movie (by name)
                movie_genre_ids = MovieGenres.objects.filter(movie_id=movie_id).values_list("genres_id", flat=True)
                genres = Genres.objects.filter(genres_id__in=movie_genre_ids)
                for genre in genres:
                    if genre.genres_name:
                        genre_name = genre.genres_name.strip().lower()
                        if genre_name:
                            genre_name_weights[genre_name] += weight

                # Get directors for this movie (by name)
                movie_director_ids = MovieDirector.objects.filter(movie_id=movie_id).values_list(
                    "director_id", flat=True
                )
                directors = Director.objects.filter(director_id__in=movie_director_ids)
                for director in directors:
                    if director.name:
                        director_name = director.name.strip().lower()
                        if director_name:
                            director_name_weights[director_name] += weight

                # Get cast for this movie (by name)
                movie_cast_ids = MovieCast.objects.filter(movie_id=movie_id).values_list("cast_id", flat=True)
                cast_items = Cast.objects.filter(cast_id__in=movie_cast_ids)
                for cast_item in cast_items:
                    if cast_item.name:
                        cast_name = cast_item.name.strip().lower()
                        if cast_name:
                            cast_name_weights[cast_name] += weight

            # Get top preferred attributes (by name and weight)
            sorted_genres = sorted(genre_name_weights.items(), key=lambda x: x[1], reverse=True)[:15]  # Top 15 genres
            preferred_genre_names = {genre_name for genre_name, _ in sorted_genres}

            sorted_directors = sorted(director_name_weights.items(), key=lambda x: x[1], reverse=True)[
                :10
            ]  # Top 10 directors
            preferred_director_names = {director_name for director_name, _ in sorted_directors}

            sorted_cast = sorted(cast_name_weights.items(), key=lambda x: x[1], reverse=True)[:20]  # Top 20 cast
            preferred_cast_names = {cast_name for cast_name, _ in sorted_cast}

            if not (preferred_genre_names or preferred_director_names or preferred_cast_names):
                logger.warning(
                    f"No genres/directors/cast found for user {user.username}'s liked movies. "
                    f"Genres: {len(preferred_genre_names)}, Directors: {len(preferred_director_names)}, Cast: {len(preferred_cast_names)}"
                )
                return []

            logger.info(
                f"User {user.username} preferences - Genres: {len(preferred_genre_names)}, "
                f"Directors: {len(preferred_director_names)}, Cast: {len(preferred_cast_names)}"
            )

            # Step 3: Find movies with matching attributes by NAME (exclude user's movies)
            matching_movie_ids = set()

            if preferred_genre_names:
                # Find genres by name (case-insensitive match)
                # Use __iexact for case-insensitive matching, but need to handle multiple names
                # So we'll get all genres and filter in Python
                all_genres = Genres.objects.all()
                matching_genre_ids = []
                for genre in all_genres:
                    if genre.genres_name:
                        genre_name_normalized = genre.genres_name.strip().lower()
                        if genre_name_normalized in preferred_genre_names:
                            matching_genre_ids.append(genre.genres_id)

                if matching_genre_ids:
                    genre_movies = MovieGenres.objects.filter(genres_id__in=matching_genre_ids).values_list(
                        "movie_id", flat=True
                    )
                    matching_movie_ids.update(genre_movies)

            if preferred_director_names:
                # Find directors by name (case-insensitive match)
                all_directors = Director.objects.all()
                matching_director_ids = []
                for director in all_directors:
                    if director.name:
                        director_name_normalized = director.name.strip().lower()
                        if director_name_normalized in preferred_director_names:
                            matching_director_ids.append(director.director_id)

                if matching_director_ids:
                    director_movies = MovieDirector.objects.filter(director_id__in=matching_director_ids).values_list(
                        "movie_id", flat=True
                    )
                    matching_movie_ids.update(director_movies)

            if preferred_cast_names:
                # Find cast by name (case-insensitive match)
                all_cast = Cast.objects.all()
                matching_cast_ids = []
                for cast_item in all_cast:
                    if cast_item.name:
                        cast_name_normalized = cast_item.name.strip().lower()
                        if cast_name_normalized in preferred_cast_names:
                            matching_cast_ids.append(cast_item.cast_id)

                if matching_cast_ids:
                    cast_movies = MovieCast.objects.filter(cast_id__in=matching_cast_ids).values_list(
                        "movie_id", flat=True
                    )
                    matching_movie_ids.update(cast_movies)

            # Exclude user's movies
            candidate_movie_ids = matching_movie_ids - user_movie_ids
            if not candidate_movie_ids:
                logger.info(
                    f"No matching movies found for user {user.username}. "
                    f"Matching movies: {len(matching_movie_ids)}, User movies: {len(user_movie_ids)}. "
                    f"Falling back to popular movies."
                )
                # Fallback: return popular/high-rated movies user hasn't seen
                return RecommendationService._get_fallback_recommendations(user_movie_ids, limit)

            logger.info(f"Found {len(candidate_movie_ids)} candidate movies for user {user.username}")

            # Step 4: Score movies by matching attributes with weighted preference (by name)
            movie_scores = defaultdict(float)

            # Pre-fetch all genres, directors, cast for candidate movies (by name)
            # Process in batches to avoid memory issues
            BATCH_SIZE = 500

            # Get genre IDs for candidate movies, then get genre names
            candidate_movie_genres = MovieGenres.objects.filter(movie_id__in=candidate_movie_ids).values_list(
                "movie_id", "genres_id"
            )
            candidate_genre_ids = list(set(genre_id for _, genre_id in candidate_movie_genres))

            # Query genres in batches
            genres_dict = {}
            for i in range(0, len(candidate_genre_ids), BATCH_SIZE):
                batch_ids = candidate_genre_ids[i : i + BATCH_SIZE]
                for g in Genres.objects.filter(genres_id__in=batch_ids):
                    if g.genres_name:
                        genres_dict[g.genres_id] = g.genres_name

            candidate_genres = []
            for movie_id, genre_id in candidate_movie_genres:
                if genre_id in genres_dict:
                    candidate_genres.append({"movie_id": movie_id, "genres_name": genres_dict[genre_id]})

            # Get director IDs for candidate movies, then get director names
            candidate_movie_directors = MovieDirector.objects.filter(movie_id__in=candidate_movie_ids).values_list(
                "movie_id", "director_id"
            )
            candidate_director_ids = list(set(director_id for _, director_id in candidate_movie_directors))

            # Query directors in batches
            directors_dict = {}
            for i in range(0, len(candidate_director_ids), BATCH_SIZE):
                batch_ids = candidate_director_ids[i : i + BATCH_SIZE]
                for d in Director.objects.filter(director_id__in=batch_ids):
                    if d.name:
                        directors_dict[d.director_id] = d.name

            candidate_directors = []
            for movie_id, director_id in candidate_movie_directors:
                if director_id in directors_dict:
                    candidate_directors.append({"movie_id": movie_id, "director_name": directors_dict[director_id]})

            # Get cast IDs for candidate movies, then get cast names (limit to top cast only)
            candidate_movie_cast = MovieCast.objects.filter(movie_id__in=candidate_movie_ids).values_list(
                "movie_id", "cast_id"
            )
            candidate_cast_ids = list(set(cast_id for _, cast_id in candidate_movie_cast))

            # Limit cast query to avoid memory issues - only query first 1000 unique cast IDs
            candidate_cast_ids = candidate_cast_ids[:1000]

            # Query cast in batches
            cast_dict = {}
            for i in range(0, len(candidate_cast_ids), BATCH_SIZE):
                batch_ids = candidate_cast_ids[i : i + BATCH_SIZE]
                for c in Cast.objects.filter(cast_id__in=batch_ids):
                    if c.name:
                        cast_dict[c.cast_id] = c.name

            candidate_cast = []
            for movie_id, cast_id in candidate_movie_cast:
                if cast_id in cast_dict:
                    candidate_cast.append({"movie_id": movie_id, "cast_name": cast_dict[cast_id]})

            # Build lookup dictionaries (by name)
            movie_genres_map = defaultdict(set)
            for item in candidate_genres:
                if item.get("genres_name"):
                    genre_name = item["genres_name"].strip().lower()
                    if genre_name:
                        movie_genres_map[item["movie_id"]].add(genre_name)

            movie_directors_map = defaultdict(set)
            for item in candidate_directors:
                if item.get("director_name"):
                    director_name = item["director_name"].strip().lower()
                    if director_name:
                        movie_directors_map[item["movie_id"]].add(director_name)

            movie_cast_map = defaultdict(set)
            for item in candidate_cast:
                if item.get("cast_name"):
                    cast_name = item["cast_name"].strip().lower()
                    if cast_name:
                        movie_cast_map[item["movie_id"]].add(cast_name)

            # Score each candidate movie using weighted preferences (by name)
            for movie_id in candidate_movie_ids:
                score = 0.0

                # Check genres (base weight: 3.0, multiplied by preference weight)
                movie_genre_names = movie_genres_map.get(movie_id, set())
                matching_genres = movie_genre_names & preferred_genre_names
                for genre_name in matching_genres:
                    score += genre_name_weights.get(genre_name, 0) * 3.0

                # Check directors (base weight: 2.0, multiplied by preference weight)
                movie_director_names = movie_directors_map.get(movie_id, set())
                matching_directors = movie_director_names & preferred_director_names
                for director_name in matching_directors:
                    score += director_name_weights.get(director_name, 0) * 2.0

                # Check cast (base weight: 1.0, multiplied by preference weight)
                movie_cast_names = movie_cast_map.get(movie_id, set())
                matching_cast = movie_cast_names & preferred_cast_names
                for cast_name in matching_cast:
                    score += cast_name_weights.get(cast_name, 0) * 1.0

                if score > 0:
                    movie_scores[movie_id] = score

            # Step 5: Sort by score and get top N
            sorted_movie_ids = sorted(movie_scores.items(), key=lambda x: x[1], reverse=True)[:limit]
            recommended_movie_ids = [movie_id for movie_id, score in sorted_movie_ids]

            # Step 6: Return movies in order
            return MovieQueryService.get_movies_by_ids(recommended_movie_ids, preserve_order=True)

        except ResourceNotFoundException:
            raise
        except Exception as e:
            logger.error(
                f"Error getting realtime recommendations for user {user.username}: {str(e)}",
                exc_info=True,
                extra={"user_id": user.id, "username": user.username},
            )
            raise BusinessLogicException(f"Error getting realtime recommendations: {str(e)}")

    @staticmethod
    def _get_fallback_recommendations(exclude_movie_ids: set, limit: int) -> List[Movieinformation]:
        """
        Get fallback recommendations (popular/trending movies) when no matches found.

        Args:
            exclude_movie_ids: Set of movie IDs to exclude (user's already seen movies)
            limit: Maximum number of recommendations

        Returns:
            List of recommended Movieinformation objects
        """
        try:
            # Get movies user hasn't seen, ordered by rating and total_vote
            from apps.movies.models import Movieinformation

            # Try to get movies with high ratings and votes
            # Parse rating if it's in format "X/Y" or just "X"
            def parse_rating(rating_str):
                if not rating_str:
                    return 0.0
                try:
                    rating_str = str(rating_str).strip()
                    if "/" in rating_str:
                        return float(rating_str.split("/")[0])
                    return float(rating_str)
                except (ValueError, AttributeError):
                    return 0.0

            all_movies = Movieinformation.objects.exclude(movie_id__in=exclude_movie_ids)

            # Sort by rating (descending), then by total_vote (descending)
            movies_list = list(all_movies)
            movies_list.sort(
                key=lambda m: (
                    parse_rating(m.rating),
                    int(m.total_vote) if m.total_vote and str(m.total_vote).isdigit() else 0,
                ),
                reverse=True,
            )

            return movies_list[:limit]
        except Exception as e:
            logger.error(f"Error getting fallback recommendations: {str(e)}", exc_info=True)
            return []
