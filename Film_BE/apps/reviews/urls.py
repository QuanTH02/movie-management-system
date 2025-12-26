"""
URL configuration for reviews app.
"""

from django.urls import path

from apps.reviews.views import FilmReviewListView, ReviewView

app_name = "reviews"

urlpatterns = [
    path("", ReviewView.as_view(), name="review"),
    path("movie/<str:movie_id>/", FilmReviewListView.as_view(), name="film-review-list"),
]
