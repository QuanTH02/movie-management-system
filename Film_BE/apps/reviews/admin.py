"""
Admin configuration for reviews app.
"""

from django.contrib import admin

from apps.reviews.models import FilmReview, RatingFilm


@admin.register(FilmReview)
class FilmReviewAdmin(admin.ModelAdmin):
    """Admin for FilmReview model."""

    list_display = ["film_review_id", "movie", "name_review", "star_review", "title_review", "date_review"]
    search_fields = ["name_review", "title_review", "content_review"]
    list_filter = ["star_review", "date_review"]


@admin.register(RatingFilm)
class RatingFilmAdmin(admin.ModelAdmin):
    """Admin for RatingFilm model."""

    list_display = ["rating_id", "movie", "number_of_stars", "number_people_vote"]
    search_fields = ["number_of_stars"]
    list_filter = ["number_of_stars"]
