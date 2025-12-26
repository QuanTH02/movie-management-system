"""
Admin configuration for movies app.
"""

from django.contrib import admin

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
    Movieinformation,
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


@admin.register(Movieinformation)
class MovieinformationAdmin(admin.ModelAdmin):
    """Admin for Movieinformation model."""

    list_display = ["movie_id", "movie_name", "year_manufacture", "release_date"]
    search_fields = ["movie_name", "original_name_movie"]
    list_filter = ["year_manufacture"]


@admin.register(Genres)
class GenresAdmin(admin.ModelAdmin):
    """Admin for Genres model."""

    list_display = ["genres_id", "genres_name"]
    search_fields = ["genres_name"]


@admin.register(Cast)
class CastAdmin(admin.ModelAdmin):
    """Admin for Cast model."""

    list_display = ["cast_id", "name", "role"]
    search_fields = ["name"]


@admin.register(Director)
class DirectorAdmin(admin.ModelAdmin):
    """Admin for Director model."""

    list_display = ["director_id", "name", "role"]
    search_fields = ["name"]


@admin.register(Cinematography)
class CinematographyAdmin(admin.ModelAdmin):
    """Admin for Cinematography model."""

    list_display = ["cinematography_id", "name", "role"]
    search_fields = ["name"]


@admin.register(Editing)
class EditingAdmin(admin.ModelAdmin):
    """Admin for Editing model."""

    list_display = ["editing_id", "name", "role"]
    search_fields = ["name"]


@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    """Admin for Music model."""

    list_display = ["music_id", "name", "role"]
    search_fields = ["name"]


@admin.register(Produced)
class ProducedAdmin(admin.ModelAdmin):
    """Admin for Produced model."""

    list_display = ["produced_id", "name", "role"]
    search_fields = ["name"]


@admin.register(Specialeffects)
class SpecialeffectsAdmin(admin.ModelAdmin):
    """Admin for Specialeffects model."""

    list_display = ["special_effect_id", "name", "role"]
    search_fields = ["name"]


@admin.register(Taglines)
class TaglinesAdmin(admin.ModelAdmin):
    """Admin for Taglines model."""

    list_display = ["taglines_id", "taglines_content"]
    search_fields = ["taglines_content"]


@admin.register(Writers)
class WritersAdmin(admin.ModelAdmin):
    """Admin for Writers model."""

    list_display = ["writers_id", "name", "role"]
    search_fields = ["name"]


@admin.register(AspectRatio)
class AspectRatioAdmin(admin.ModelAdmin):
    """Admin for AspectRatio model."""

    list_display = ["aspect_ratio_id", "aspect_ratio_name", "movie"]
    search_fields = ["aspect_ratio_name"]


@admin.register(Awards)
class AwardsAdmin(admin.ModelAdmin):
    """Admin for Awards model."""

    list_display = ["awards_id", "awards_name", "movie"]
    search_fields = ["awards_name"]


@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    """Admin for Camera model."""

    list_display = ["camera_id", "camera_name", "movie"]
    search_fields = ["camera_name"]


@admin.register(CinematographicProcess)
class CinematographicProcessAdmin(admin.ModelAdmin):
    """Admin for CinematographicProcess model."""

    list_display = ["cinematographic_process_id", "cinematographic_process_name", "movie"]
    search_fields = ["cinematographic_process_name"]


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    """Admin for Color model."""

    list_display = ["color_id", "color_name", "movie"]
    search_fields = ["color_name"]


@admin.register(CountryOrigin)
class CountryOriginAdmin(admin.ModelAdmin):
    """Admin for CountryOrigin model."""

    list_display = ["country_origin_id", "country_origin_name", "movie"]
    search_fields = ["country_origin_name"]


@admin.register(DidYouKnow)
class DidYouKnowAdmin(admin.ModelAdmin):
    """Admin for DidYouKnow model."""

    list_display = ["did_you_know_id", "name", "movie"]
    search_fields = ["name", "content"]


@admin.register(FilmingLocations)
class FilmingLocationsAdmin(admin.ModelAdmin):
    """Admin for FilmingLocations model."""

    list_display = ["filming_locations_id", "filming_locations_name", "movie"]
    search_fields = ["filming_locations_name"]


@admin.register(Laboratory)
class LaboratoryAdmin(admin.ModelAdmin):
    """Admin for Laboratory model."""

    list_display = ["laboratory_id", "laboratory_name", "movie"]
    search_fields = ["laboratory_name"]


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    """Admin for Language model."""

    list_display = ["language_id", "language_name", "movie"]
    search_fields = ["language_name"]


@admin.register(NegativeFormat)
class NegativeFormatAdmin(admin.ModelAdmin):
    """Admin for NegativeFormat model."""

    list_display = ["negative_format_id", "negative_format_name", "movie"]
    search_fields = ["negative_format_name"]


@admin.register(OfficialSite)
class OfficialSiteAdmin(admin.ModelAdmin):
    """Admin for OfficialSite model."""

    list_display = ["official_site_id", "official_site_name", "movie"]
    search_fields = ["official_site_name"]


@admin.register(PrintedFilmFormat)
class PrintedFilmFormatAdmin(admin.ModelAdmin):
    """Admin for PrintedFilmFormat model."""

    list_display = ["printed_film_format_id", "printed_film_format_name", "movie"]
    search_fields = ["printed_film_format_name"]


@admin.register(ProductionCompanies)
class ProductionCompaniesAdmin(admin.ModelAdmin):
    """Admin for ProductionCompanies model."""

    list_display = ["production_companies_id", "production_companies_name", "movie"]
    search_fields = ["production_companies_name"]


@admin.register(SoundMix)
class SoundMixAdmin(admin.ModelAdmin):
    """Admin for SoundMix model."""

    list_display = ["sound_mix_id", "sound_mix_name", "movie"]
    search_fields = ["sound_mix_name"]


@admin.register(TicketRoom)
class TicketRoomAdmin(admin.ModelAdmin):
    """Admin for TicketRoom model."""

    list_display = ["ticket_room_id", "movie", "budget", "gross_worldwide"]
    search_fields = ["budget", "gross"]


@admin.register(LinkImg)
class LinkImgAdmin(admin.ModelAdmin):
    """Admin for LinkImg model."""

    list_display = ["link_img_id", "link_img"]
    search_fields = ["link_img"]


@admin.register(LinkTrailer)
class LinkTrailerAdmin(admin.ModelAdmin):
    """Admin for LinkTrailer model."""

    list_display = ["link_trailler_id", "link_trailler"]
    search_fields = ["link_trailler"]
