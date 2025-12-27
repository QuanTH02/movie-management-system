"""Service for vector-based movie search using embeddings."""

import logging
from typing import List, Tuple

import numpy as np

from apps.movies.models import Movieinformation
from apps.movies.services.movie_embedding_service import MovieEmbeddingService

logger = logging.getLogger(__name__)


class VectorSearchService:
    """Service for vector-based movie search."""

    @staticmethod
    def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
        """Calculate cosine similarity between two vectors."""
        vec1 = np.array(vec1)
        vec2 = np.array(vec2)
        dot_product = np.dot(vec1, vec2)
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)
        if norm1 == 0 or norm2 == 0:
            return 0.0
        return float(dot_product / (norm1 * norm2))

    @staticmethod
    def search_movies(query: str, top_k: int = 50, min_similarity: float = 0.3) -> List[Tuple[Movieinformation, float]]:
        """
        Search movies using vector similarity.

        Args:
            query: Search query text
            top_k: Number of top results to return
            min_similarity: Minimum similarity threshold (0-1)

        Returns:
            List of tuples (movie, similarity_score) sorted by similarity
        """
        # Generate query embedding
        query_embedding = MovieEmbeddingService.generate_embedding(query)
        if not query_embedding:
            logger.warning("Failed to generate query embedding")
            return []

        # Load movie embeddings
        movie_embeddings = MovieEmbeddingService.load_embeddings()
        if not movie_embeddings:
            logger.warning("No movie embeddings found. Please generate embeddings first.")
            return []

        # Calculate similarities
        similarities = []
        for movie_id, movie_embedding in movie_embeddings.items():
            try:
                similarity = VectorSearchService.cosine_similarity(query_embedding, movie_embedding)
                if similarity >= min_similarity:
                    similarities.append((movie_id, similarity))
            except Exception as e:
                logger.error(f"Error calculating similarity for movie {movie_id}: {e}")
                continue

        # Sort by similarity (descending)
        similarities.sort(key=lambda x: x[1], reverse=True)

        # Get top_k results
        top_results = similarities[:top_k]

        # Fetch movie objects
        movie_ids = [movie_id for movie_id, _ in top_results]
        movies_dict = {m.movie_id: m for m in Movieinformation.objects.filter(movie_id__in=movie_ids)}

        # Return results with similarity scores
        results = []
        for movie_id, similarity in top_results:
            if movie_id in movies_dict:
                results.append((movies_dict[movie_id], similarity))

        return results
