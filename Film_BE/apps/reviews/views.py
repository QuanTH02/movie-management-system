"""
Views for reviews app.
Handles film review operations.
"""

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.core.exceptions import ResourceNotFoundException
from apps.movies.services.movie_query_service import MovieQueryService
from apps.reviews.models import FilmReview
from apps.reviews.serializers import FilmReviewSerializer, ReviewSerializer
from apps.reviews.services.review_service import ReviewService


class ReviewView(APIView):
    """
    Film review management endpoint.

    POST: Create or update a review
    Request body:
    - movie (required): Movie name
    - star_review (required): Star rating
    - title_review (required): Review title
    - content_review (required): Review content
    - name_review (required): Reviewer name
    - film_review_id (optional): Review ID for update

    DELETE: Delete a review
    Request body:
    - film_review_id (required): Review ID to delete

    Returns:
    - 201 Created: Review created/updated successfully
    - 204 No Content: Review deleted successfully
    - 400 Bad Request: Validation error
    - 404 Not Found: Review or movie not found
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        movie_name = request.data.get("movie")
        if not movie_name:
            return Response(
                {"message": "movie_name is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        film_review_id = request.data.get("film_review_id")

        try:
            if film_review_id:
                # Update existing review
                film_review = ReviewService.update_review(
                    film_review_id=film_review_id,
                    movie_name=movie_name,
                    star_review=request.data.get("star_review"),
                    title_review=request.data.get("title_review"),
                    content_review=request.data.get("content_review"),
                    name_review=request.data.get("name_review"),
                )
                message = "Review updated successfully."
            else:
                # Create new review
                film_review = ReviewService.create_review(
                    movie_name=movie_name,
                    star_review=str(request.data.get("star_review")),
                    title_review=request.data.get("title_review"),
                    content_review=request.data.get("content_review"),
                    name_review=request.data.get("name_review"),
                )
                message = "Review created successfully."

            return Response(
                {"message": message},
                status=status.HTTP_201_CREATED,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )

    def delete(self, request):
        film_review_id = request.data.get("film_review_id")
        if not film_review_id:
            return Response(
                {"message": "film_review_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            ReviewService.delete_review(film_review_id)
            return Response(
                {"message": "Review deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )


class FilmReviewListView(generics.ListAPIView):
    """
    List film reviews for a movie.

    GET:
    URL parameter:
    - movie_id: Movie ID or name

    Returns:
    - 200 OK: List of film reviews
    - 404 Not Found: Movie not found
    """

    serializer_class = FilmReviewSerializer
    permission_classes = [AllowAny]  # Allow anyone to read reviews

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        try:
            movie = MovieQueryService.get_movie_by_id_or_name(movie_id)
            return FilmReview.objects.filter(movie__movie_id=movie.movie_id)
        except ResourceNotFoundException:
            return FilmReview.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(
            {"message": "Successfully", "data": serializer.data},
            status=status.HTTP_200_OK,
        )
