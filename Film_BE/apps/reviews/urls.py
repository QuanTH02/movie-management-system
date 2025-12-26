"""
URL configuration for reviews app.
"""

from django.urls import path

from apps.reviews.views import FilmReviewListView, ReviewView

app_name = "reviews"

urlpatterns = [
    # Review management endpoints
    path("", ReviewView.as_view(), name="review-list"),
    # Movie reviews endpoints
    path("movies/<str:movie_id>/", FilmReviewListView.as_view(), name="movie-reviews"),
]
