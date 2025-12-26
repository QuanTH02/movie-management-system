"""
Backward compatibility: Re-export models from new apps.
This file maintains backward compatibility with existing code that imports from App_Film_BE.models.
"""

# Keep Testadd model for backward compatibility (if needed)
from django.db import models

# Import all models from new apps for backward compatibility
from apps.movies.models import (
    AspectRatio,
    Awards,
    Camera,
    Cast,
    CinematographicProcess,
    Cinematography,
    Color,
    CountryOrigin,
    DidYouKnow,
    Director,
    Editing,
    FilmingLocations,
    Genres,
    Laboratory,
    Language,
    LinkImg,
    LinkTrailer,
    MovieCast,
    MovieCinematography,
    MovieDirector,
    MovieEditing,
    MovieGenres,
    MovieImg,
    Movieinformation,
    MovieMusic,
    MovieProduced,
    MovieSpecialeffects,
    MovieTaglines,
    MovieTrailer,
    MovieWriters,
    Music,
    NegativeFormat,
    OfficialSite,
    PrintedFilmFormat,
    Produced,
    ProductionCompanies,
    SoundMix,
    Specialeffects,
    Taglines,
    TicketRoom,
    Writers,
)
from apps.reviews.models import FilmReview, RatingFilm
from apps.users.models import FollowFilmUser, LikeMovie


class Testadd(models.Model):
    idtestadd = models.IntegerField(db_column="idtestAdd", primary_key=True)
    new_column = models.CharField(max_length=45, blank=True, null=True)
    testadd = models.CharField(db_column="testAdd", max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "testadd"
