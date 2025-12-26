"""
Models for users app.
"""

from django.contrib.auth.models import User
from django.db import models


class FollowFilmUser(models.Model):
    """
    Model to track which movies a user follows.
    This model can potentially inherit from BaseModel in the future,
    but for now we keep it as is to avoid breaking changes.
    """

    follow_id = models.AutoField(primary_key=True)
    movie = models.ForeignKey("movies.Movieinformation", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_view = models.IntegerField(default=0)

    class Meta:
        db_table = "follow_film_user"
        verbose_name = "Follow Film User"
        verbose_name_plural = "Follow Film Users"
        unique_together = [["movie", "user"]]

    def __str__(self):
        return f"{self.user.username} follows {self.movie.movie_name if self.movie else 'Unknown'}"


class LikeMovie(models.Model):
    """
    Model to track which movies a user likes.
    This model has managed = False as it maps to an existing database table.
    """

    movie = models.ForeignKey("movies.Movieinformation", models.DO_NOTHING)
    user_name = models.TextField(primary_key=True)

    class Meta:
        managed = False
        db_table = "like_movie"
        verbose_name = "Like Movie"
        verbose_name_plural = "Like Movies"

    def __str__(self):
        return f"{self.user_name} likes {self.movie.movie_name if self.movie else 'Unknown'}"
