"""Service for filtering movies based on filter criteria."""

from typing import Dict, Optional

from django.db.models import Q, QuerySet

from apps.movies.models import Cast, Director, Genres, Movieinformation


class MovieFilterService:
    """Service for filtering movies based on criteria."""

    @staticmethod
    def _parse_year(year_str: Optional[str]) -> Optional[int]:
        """Parse year from string."""
        if not year_str:
            return None
        try:
            # Extract first 4 digits
            year_str = str(year_str).strip()
            if len(year_str) >= 4:
                return int(year_str[:4])
            return int(year_str)
        except (ValueError, TypeError):
            return None

    @staticmethod
    def _parse_rating(rating_str: Optional[str]) -> Optional[float]:
        """Parse rating from string (e.g., '8.5/10' -> 8.5)."""
        if not rating_str:
            return None
        try:
            rating_str = str(rating_str).strip()
            if "/" in rating_str:
                return float(rating_str.split("/")[0].strip())
            return float(rating_str)
        except (ValueError, TypeError):
            return None

    @staticmethod
    def filter_movies(filter_data: Dict) -> QuerySet:
        """
        Filter movies based on filter criteria.

        Args:
            filter_data: Dictionary with filter parameters

        Returns:
            QuerySet of filtered movies
        """
        queryset = Movieinformation.objects.all()

        # Filter by movie name
        movie_name = filter_data.get("movie_name")
        if movie_name and isinstance(movie_name, str) and movie_name.strip():
            queryset = queryset.filter(movie_name__icontains=movie_name.strip())

        # Filter by year range
        year_min = filter_data.get("year_min")
        if year_min is not None:
            try:
                year_min_int = int(year_min)
                # Filter by year_manufacture (string field)
                queryset = queryset.filter(year_manufacture__gte=str(year_min_int))
            except (ValueError, TypeError):
                pass

        year_max = filter_data.get("year_max")
        if year_max is not None:
            try:
                year_max_int = int(year_max)
                queryset = queryset.filter(year_manufacture__lte=str(year_max_int))
            except (ValueError, TypeError):
                pass

        # Filter by rating range
        rating_min = filter_data.get("rating_min")
        if rating_min is not None:
            try:
                rating_min_float = float(rating_min)
                # Need to filter by parsed rating
                # Get all movies and filter in Python (not ideal but necessary for string parsing)
                movie_ids = []
                for movie in queryset:
                    parsed_rating = MovieFilterService._parse_rating(movie.rating)
                    if parsed_rating is not None and parsed_rating >= rating_min_float:
                        movie_ids.append(movie.movie_id)
                queryset = queryset.filter(movie_id__in=movie_ids)
            except (ValueError, TypeError):
                pass

        rating_max = filter_data.get("rating_max")
        if rating_max is not None:
            try:
                rating_max_float = float(rating_max)
                movie_ids = []
                for movie in queryset:
                    parsed_rating = MovieFilterService._parse_rating(movie.rating)
                    if parsed_rating is not None and parsed_rating <= rating_max_float:
                        movie_ids.append(movie.movie_id)
                queryset = queryset.filter(movie_id__in=movie_ids)
            except (ValueError, TypeError):
                pass

        # Filter by genres
        genres = filter_data.get("genres", [])
        if genres and isinstance(genres, list) and len(genres) > 0:
            genre_names = [g.strip() for g in genres if isinstance(g, str) and g.strip()]
            if genre_names:
                genre_objects = Genres.objects.filter(genres_name__in=genre_names)
                if genre_objects.exists():
                    genre_ids = list(genre_objects.values_list("genres_id", flat=True))
                    # Use raw SQL to avoid id column issue
                    from django.db import connection

                    if genre_ids:
                        placeholders = ",".join(["%s"] * len(genre_ids))
                        with connection.cursor() as cursor:
                            cursor.execute(
                                f"SELECT DISTINCT movie_id FROM movie_genres WHERE genres_id IN ({placeholders})",
                                genre_ids,
                            )
                            movie_ids = [row[0] for row in cursor.fetchall()]
                        if movie_ids:
                            queryset = queryset.filter(movie_id__in=movie_ids)

        # Filter by directors
        directors = filter_data.get("directors", [])
        if directors and isinstance(directors, list) and len(directors) > 0:
            director_names = [d.strip() for d in directors if isinstance(d, str) and d.strip()]
            if director_names:
                # Use icontains for partial matching
                from django.db import connection

                director_q = Q()
                for name in director_names:
                    director_q |= Q(name__icontains=name)

                director_objects = Director.objects.filter(director_q)
                if director_objects.exists():
                    director_ids = list(director_objects.values_list("director_id", flat=True).distinct())
                    # Use raw SQL to avoid id column issue
                    if director_ids:
                        placeholders = ",".join(["%s"] * len(director_ids))
                        with connection.cursor() as cursor:
                            cursor.execute(
                                f"SELECT DISTINCT movie_id FROM movie_director WHERE director_id IN ({placeholders})",
                                director_ids,
                            )
                            movie_ids = [row[0] for row in cursor.fetchall()]
                        if movie_ids:
                            queryset = queryset.filter(movie_id__in=movie_ids)

        # Filter by cast
        cast = filter_data.get("cast", [])
        if cast and isinstance(cast, list) and len(cast) > 0:
            cast_names = [c.strip() for c in cast if isinstance(c, str) and c.strip()]
            if cast_names:
                # Use icontains for partial matching (e.g., "James" matches "James Lee Thomas")
                from django.db import connection
                from django.db.models import Q

                cast_q = Q()
                for name in cast_names:
                    cast_q |= Q(name__icontains=name)

                cast_objects = Cast.objects.filter(cast_q)
                if cast_objects.exists():
                    cast_ids = list(cast_objects.values_list("cast_id", flat=True).distinct())
                    # Use raw SQL to avoid id column issue
                    if cast_ids:
                        placeholders = ",".join(["%s"] * len(cast_ids))
                        with connection.cursor() as cursor:
                            cursor.execute(
                                f"SELECT DISTINCT movie_id FROM movie_cast WHERE cast_id IN ({placeholders})",
                                cast_ids,
                            )
                            movie_ids = [row[0] for row in cursor.fetchall()]
                        if movie_ids:
                            queryset = queryset.filter(movie_id__in=movie_ids)

        # Filter by countries
        countries = filter_data.get("countries", [])
        if countries and isinstance(countries, list) and len(countries) > 0:
            country_names = [c.strip() for c in countries if isinstance(c, str) and c.strip()]
            if country_names:
                queryset = queryset.filter(countryorigin__country_origin_name__in=country_names).distinct()

        # Filter by languages
        languages = filter_data.get("languages", [])
        if languages and isinstance(languages, list) and len(languages) > 0:
            language_names = [lang.strip() for lang in languages if isinstance(lang, str) and lang.strip()]
            if language_names:
                queryset = queryset.filter(language__language_name__in=language_names).distinct()

        # Filter by keywords (search in describe_movie and storyline)
        keywords = filter_data.get("keywords", [])
        if keywords and isinstance(keywords, list) and len(keywords) > 0:
            keyword_list = [k.strip() for k in keywords if isinstance(k, str) and k.strip()]
            if keyword_list:
                q_objects = Q()
                for keyword in keyword_list:
                    q_objects |= Q(describe_movie__icontains=keyword)
                    q_objects |= Q(storyline__icontains=keyword)
                queryset = queryset.filter(q_objects)

        return queryset
