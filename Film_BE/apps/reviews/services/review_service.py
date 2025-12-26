"""
Service for review operations.
"""

import csv
from typing import Optional

from django.utils import timezone

from apps.core.exceptions import BusinessLogicException, ResourceNotFoundException
from apps.movies.models import Movieinformation
from apps.reviews.models import FilmReview


class ReviewService:
    """Service for managing film reviews."""

    CSV_FILE_PATH = "App_Film_BE/Reconmmendation/Collaborative/output.csv"

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
        movie_info = Movieinformation.objects.filter(movie_name=movie_name).first()
        if not movie_info:
            raise ResourceNotFoundException(f"Movie '{movie_name}' not found.")
        return movie_info

    @staticmethod
    def create_review(
        movie_name: str,
        star_review: str,
        title_review: str,
        content_review: str,
        name_review: str,
    ) -> FilmReview:
        """
        Create a new review.

        Args:
            movie_name: The movie name
            star_review: The star rating
            title_review: The review title
            content_review: The review content
            name_review: The reviewer name

        Returns:
            Created FilmReview object

        Raises:
            ResourceNotFoundException: If movie is not found
        """
        movie_info = ReviewService.get_movie_by_name(movie_name)
        movie_id = movie_info.movie_id

        # Calculate next review ID
        total_reviews = FilmReview.objects.count()
        film_review_id = total_reviews + 1

        date_review = timezone.now()

        # Create review
        film_review = FilmReview.objects.create(
            film_review_id=film_review_id,
            movie_id=movie_id,
            star_review=star_review,
            title_review=title_review,
            name_review=name_review,
            date_review=date_review,
            content_review=content_review,
        )

        # Write to CSV for recommendation system
        try:
            with open(ReviewService.CSV_FILE_PATH, "a", newline="") as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow([name_review, movie_id, star_review])
        except Exception:
            # Log error but don't fail the operation
            pass

        return film_review

    @staticmethod
    def update_review(
        film_review_id: int,
        movie_name: Optional[str] = None,
        star_review: Optional[str] = None,
        title_review: Optional[str] = None,
        content_review: Optional[str] = None,
        name_review: Optional[str] = None,
    ) -> FilmReview:
        """
        Update an existing review.

        Args:
            film_review_id: The review ID
            movie_name: The movie name (optional)
            star_review: The star rating (optional)
            title_review: The review title (optional)
            content_review: The review content (optional)
            name_review: The reviewer name (optional)

        Returns:
            Updated FilmReview object

        Raises:
            ResourceNotFoundException: If review or movie is not found
        """
        film_review = FilmReview.objects.filter(film_review_id=film_review_id).first()
        if not film_review:
            raise ResourceNotFoundException(f"Review with ID '{film_review_id}' not found.")

        # Update movie if provided
        if movie_name:
            movie_info = ReviewService.get_movie_by_name(movie_name)
            film_review.movie_id = movie_info.movie_id

        # Update other fields
        if star_review is not None:
            film_review.star_review = star_review
        if title_review is not None:
            film_review.title_review = title_review
        if content_review is not None:
            film_review.content_review = content_review
        if name_review is not None:
            film_review.name_review = name_review

        film_review.date_review = timezone.now()
        film_review.save()

        return film_review

    @staticmethod
    def delete_review(film_review_id: int) -> None:
        """
        Delete a review.

        Args:
            film_review_id: The review ID

        Raises:
            ResourceNotFoundException: If review is not found
        """
        film_review = FilmReview.objects.filter(film_review_id=film_review_id).first()
        if not film_review:
            raise ResourceNotFoundException(f"Review with ID '{film_review_id}' not found.")

        film_review.delete()
