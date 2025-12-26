"""
Models for reviews app.
All models have managed = False as they map to existing database tables.
"""

from django.db import models


class FilmReview(models.Model):
    film_review_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey("movies.Movieinformation", models.DO_NOTHING, blank=True, null=True)
    star_review = models.CharField(max_length=45, blank=True, null=True)
    title_review = models.TextField(blank=True, null=True)
    name_review = models.CharField(max_length=45, blank=True, null=True)
    date_review = models.CharField(max_length=45, blank=True, null=True)
    content_review = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "film_review"
        verbose_name = "Film Review"
        verbose_name_plural = "Film Reviews"

    def __str__(self):
        return f"Review by {self.name_review or 'Unknown'} for {self.movie.movie_name if self.movie else 'Unknown'}"


class RatingFilm(models.Model):
    rating_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey("movies.Movieinformation", models.DO_NOTHING, blank=True, null=True)
    number_of_stars = models.CharField(max_length=45, blank=True, null=True)
    percent_people_vote = models.CharField(max_length=45, blank=True, null=True)
    number_people_vote = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "rating"
        verbose_name = "Rating Film"
        verbose_name_plural = "Rating Films"

    def __str__(self):
        return f"Rating {self.number_of_stars or 'N/A'} for {self.movie.movie_name if self.movie else 'Unknown'}"
