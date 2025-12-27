"""Management command to generate embeddings for all movies."""
from django.core.management.base import BaseCommand

from apps.movies.services.movie_embedding_service import MovieEmbeddingService


class Command(BaseCommand):
    """Command to generate embeddings for all movies."""

    help = "Generate embeddings for all movies using Gemini API"

    def add_arguments(self, parser):
        """Add command line arguments."""
        parser.add_argument(
            "--limit",
            type=int,
            default=None,
            help="Limit number of movies to process (for testing)",
        )
        parser.add_argument(
            "--batch-size",
            type=int,
            default=10,
            help="Number of embeddings to generate before saving (default: 10)",
        )

    def handle(self, *args, **options):
        """Handle the command execution."""
        limit = options.get("limit")
        batch_size = options.get("batch_size", 10)

        self.stdout.write("Starting embedding generation...")
        self.stdout.write(f"Batch size: {batch_size}")
        if limit:
            self.stdout.write(f"Limit: {limit} movies")

        try:
            MovieEmbeddingService.generate_all_embeddings(batch_size=batch_size, limit=limit)
            self.stdout.write(self.style.SUCCESS("Successfully generated embeddings"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error generating embeddings: {e}"))
            raise

