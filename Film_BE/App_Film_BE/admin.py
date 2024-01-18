from django.contrib import admin

# Register your models here.

from .models import (
    Movieinformation,
    Awards,
    MovieDirector,
    Director,
    Camera,
    Cast,
    MovieCast,
    Cinematography,
    MovieCinematography,
    Editing,
    MovieEditing,
    Genres,
    MovieGenres,
    Music,
    MovieMusic,
    Produced,
    MovieProduced,
    Specialeffects,
    MovieSpecialeffects,
    Taglines,
    MovieTaglines,
    Writers,
    MovieWriters,
    AspectRatio,
    CinematographicProcess,
    Color,
    CountryOrigin,
    DidYouKnow,
    FilmReview,
    FilmingLocations,
    Laboratory,
    Language,
    NegativeFormat,
    OfficialSite,
    PrintedFilmFormat,
    ProductionCompanies,
    RatingFilm,
    SoundMix,
    TicketRoom,
)

admin.site.register(Movieinformation)
admin.site.register(Awards)
admin.site.register(MovieDirector)
admin.site.register(Director)
admin.site.register(Camera)
admin.site.register(Cast)
admin.site.register(MovieCast)
admin.site.register(Cinematography)
admin.site.register(MovieCinematography)
admin.site.register(Editing)
admin.site.register(MovieEditing)
admin.site.register(Genres)
admin.site.register(MovieGenres)
admin.site.register(Music)
admin.site.register(MovieMusic)
admin.site.register(Produced)
admin.site.register(MovieProduced)
admin.site.register(Specialeffects)
admin.site.register(MovieSpecialeffects)
admin.site.register(Taglines)
admin.site.register(MovieTaglines)
admin.site.register(Writers)
admin.site.register(MovieWriters)
admin.site.register(AspectRatio)
admin.site.register(CinematographicProcess)
admin.site.register(Color)
admin.site.register(CountryOrigin)
admin.site.register(DidYouKnow)
admin.site.register(FilmReview)
admin.site.register(FilmingLocations)
admin.site.register(Laboratory)
admin.site.register(Language)
admin.site.register(NegativeFormat)
admin.site.register(OfficialSite)
admin.site.register(PrintedFilmFormat)
admin.site.register(ProductionCompanies)
admin.site.register(RatingFilm)
admin.site.register(SoundMix)
admin.site.register(TicketRoom)


