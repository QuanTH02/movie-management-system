"""
Serializers for reviews app.
"""

from rest_framework import serializers

from apps.reviews.models import FilmReview, RatingFilm


class FilmReviewSerializer(serializers.ModelSerializer):
    """Serializer for FilmReview model."""

    class Meta:
        model = FilmReview
        fields = [
            "film_review_id",
            "movie",
            "name_review",
            "star_review",
            "title_review",
            "content_review",
            "date_review",
        ]


class RatingFilmSerializer(serializers.ModelSerializer):
    """Serializer for RatingFilm model."""

    class Meta:
        model = RatingFilm
        fields = "__all__"


class ReviewSerializer(serializers.Serializer):
    """Serializer for review creation/update."""

    star_review = serializers.IntegerField()
    title_review = serializers.CharField()
    content_review = serializers.CharField()
    movie_name = serializers.CharField()
    name_review = serializers.CharField()
