"""Service for generating and managing movie embeddings using Gemini API."""

import logging
import os
import pickle
from typing import Dict, List, Optional

from django.conf import settings

from apps.movies.models import Cast, Director, Genres, MovieCast, MovieDirector, MovieGenres, Movieinformation

logger = logging.getLogger(__name__)

# Optional import for Gemini
try:
    import google.generativeai as genai

    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    logger.warning("google-generativeai not installed. Embedding generation will not be available.")


class MovieEmbeddingService:
    """Service for generating and managing movie embeddings."""

    EMBEDDINGS_DIR = os.path.join(os.path.dirname(__file__), "../../../embeddings")
    EMBEDDINGS_FILE = os.path.join(EMBEDDINGS_DIR, "movie_embeddings.pkl")

    @staticmethod
    def _get_movie_text(movie: Movieinformation) -> str:
        """Generate text representation of movie for embedding."""
        parts = []

        # Movie name
        if movie.movie_name:
            parts.append(f"Title: {movie.movie_name}")

        # Year
        if movie.year_manufacture:
            parts.append(f"Year: {movie.year_manufacture}")

        # Description
        if movie.describe_movie:
            parts.append(f"Description: {movie.describe_movie}")

        # Storyline
        if movie.storyline:
            parts.append(f"Storyline: {movie.storyline}")

        # Genres
        try:
            genres = MovieGenres.objects.filter(movie_id=movie.movie_id)
            genre_ids = genres.values_list("genres_id", flat=True)
            genre_names = Genres.objects.filter(genres_id__in=genre_ids).values_list("genres_name", flat=True)
            if genre_names:
                parts.append(f"Genres: {', '.join([g for g in genre_names if g])}")
        except Exception:
            pass

        # Directors
        try:
            directors = MovieDirector.objects.filter(movie_id=movie.movie_id)
            director_ids = directors.values_list("director_id", flat=True)
            director_names = Director.objects.filter(director_id__in=director_ids).values_list("name", flat=True)
            if director_names:
                parts.append(f"Directors: {', '.join([d for d in director_names if d])}")
        except Exception:
            pass

        # Cast (limit to top 5)
        try:
            cast = MovieCast.objects.filter(movie_id=movie.movie_id)[:5]
            cast_ids = cast.values_list("cast_id", flat=True)
            cast_names = Cast.objects.filter(cast_id__in=cast_ids).values_list("name", flat=True)
            if cast_names:
                parts.append(f"Cast: {', '.join([c for c in cast_names if c])}")
        except Exception:
            pass

        return " | ".join(parts)

    @staticmethod
    def generate_embedding(text: str) -> Optional[List[float]]:
        """Generate embedding for text using Gemini API."""
        if not GEMINI_AVAILABLE:
            logger.warning("google-generativeai not available")
            return None

        try:
            api_key = getattr(settings, "GEMINI_API_KEY", None)
            if not api_key:
                logger.warning("GEMINI_API_KEY not configured")
                return None

            genai.configure(api_key=api_key)
            # Use embedding model
            result = genai.embed_content(
                model="models/text-embedding-004",
                content=text,
            )
            if result and "embedding" in result:
                return result["embedding"]
            return None
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            return None

    @staticmethod
    def generate_movie_embedding(movie: Movieinformation) -> Optional[List[float]]:
        """Generate embedding for a movie."""
        text = MovieEmbeddingService._get_movie_text(movie)
        if not text:
            return None
        return MovieEmbeddingService.generate_embedding(text)

    @staticmethod
    def load_embeddings() -> Dict[int, List[float]]:
        """Load embeddings from file."""
        if not os.path.exists(MovieEmbeddingService.EMBEDDINGS_FILE):
            return {}

        try:
            with open(MovieEmbeddingService.EMBEDDINGS_FILE, "rb") as f:
                return pickle.load(f)
        except Exception as e:
            logger.error(f"Error loading embeddings: {e}")
            return {}

    @staticmethod
    def save_embeddings(embeddings: Dict[int, List[float]]):
        """Save embeddings to file."""
        os.makedirs(MovieEmbeddingService.EMBEDDINGS_DIR, exist_ok=True)

        try:
            with open(MovieEmbeddingService.EMBEDDINGS_FILE, "wb") as f:
                pickle.dump(embeddings, f)
            logger.info(f"Saved {len(embeddings)} embeddings to {MovieEmbeddingService.EMBEDDINGS_FILE}")
        except Exception as e:
            logger.error(f"Error saving embeddings: {e}")

    @staticmethod
    def generate_all_embeddings(batch_size: int = 10, limit: Optional[int] = None):
        """Generate embeddings for all movies."""
        if not GEMINI_AVAILABLE:
            logger.error("Gemini API not available")
            return

        embeddings = MovieEmbeddingService.load_embeddings()
        movies = Movieinformation.objects.all()

        if limit:
            movies = movies[:limit]

        total = movies.count()
        processed = 0
        skipped = 0

        logger.info(f"Generating embeddings for {total} movies...")

        for movie in movies:
            if movie.movie_id in embeddings:
                skipped += 1
                continue

            embedding = MovieEmbeddingService.generate_movie_embedding(movie)
            if embedding:
                embeddings[movie.movie_id] = embedding
                processed += 1

                if processed % batch_size == 0:
                    MovieEmbeddingService.save_embeddings(embeddings)
                    logger.info(f"Processed {processed}/{total} movies (skipped {skipped})")

            # Small delay to avoid rate limiting
            import time

            time.sleep(0.1)

        MovieEmbeddingService.save_embeddings(embeddings)
        logger.info(f"Completed: {processed} new embeddings, {skipped} skipped, {len(embeddings)} total")
