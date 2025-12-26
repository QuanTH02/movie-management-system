"""
Serializers for movies app.
"""

from rest_framework import serializers

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
    MovieImg,
    Movieinformation,
    MovieTrailer,
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


class FilmSerializer(serializers.ModelSerializer):
    """Serializer for Movieinformation model."""

    class Meta:
        model = Movieinformation
        fields = "__all__"


class GenresSerializer(serializers.ModelSerializer):
    """Serializer for Genres model."""

    class Meta:
        model = Genres
        fields = "__all__"


class CastSerializer(serializers.ModelSerializer):
    """Serializer for Cast model."""

    class Meta:
        model = Cast
        fields = "__all__"


class DirectorSerializer(serializers.ModelSerializer):
    """Serializer for Director model."""

    class Meta:
        model = Director
        fields = "__all__"


class CinematographySerializer(serializers.ModelSerializer):
    """Serializer for Cinematography model."""

    class Meta:
        model = Cinematography
        fields = "__all__"


class EditingSerializer(serializers.ModelSerializer):
    """Serializer for Editing model."""

    class Meta:
        model = Editing
        fields = "__all__"


class MusicSerializer(serializers.ModelSerializer):
    """Serializer for Music model."""

    class Meta:
        model = Music
        fields = "__all__"


class ProducedSerializer(serializers.ModelSerializer):
    """Serializer for Produced model."""

    class Meta:
        model = Produced
        fields = "__all__"


class SpecialeffectsSerializer(serializers.ModelSerializer):
    """Serializer for Specialeffects model."""

    class Meta:
        model = Specialeffects
        fields = "__all__"


class TaglinesSerializer(serializers.ModelSerializer):
    """Serializer for Taglines model."""

    class Meta:
        model = Taglines
        fields = "__all__"


class WritersSerializer(serializers.ModelSerializer):
    """Serializer for Writers model."""

    class Meta:
        model = Writers
        fields = "__all__"


class AspectRatiosSerializer(serializers.ModelSerializer):
    """Serializer for AspectRatio model."""

    class Meta:
        model = AspectRatio
        fields = "__all__"


class AwardsSerializer(serializers.ModelSerializer):
    """Serializer for Awards model."""

    class Meta:
        model = Awards
        fields = "__all__"


class CameraSerializer(serializers.ModelSerializer):
    """Serializer for Camera model."""

    class Meta:
        model = Camera
        fields = "__all__"


class CinematographicProcessSerializer(serializers.ModelSerializer):
    """Serializer for CinematographicProcess model."""

    class Meta:
        model = CinematographicProcess
        fields = "__all__"


class ColorSerializer(serializers.ModelSerializer):
    """Serializer for Color model."""

    class Meta:
        model = Color
        fields = "__all__"


class CountryOriginSerializer(serializers.ModelSerializer):
    """Serializer for CountryOrigin model."""

    class Meta:
        model = CountryOrigin
        fields = "__all__"


class DidYouKnowSerializer(serializers.ModelSerializer):
    """Serializer for DidYouKnow model."""

    class Meta:
        model = DidYouKnow
        fields = "__all__"


class FilmingLocationsSerializer(serializers.ModelSerializer):
    """Serializer for FilmingLocations model."""

    class Meta:
        model = FilmingLocations
        fields = "__all__"


class LaboratorySerializer(serializers.ModelSerializer):
    """Serializer for Laboratory model."""

    class Meta:
        model = Laboratory
        fields = "__all__"


class LanguageSerializer(serializers.ModelSerializer):
    """Serializer for Language model."""

    class Meta:
        model = Language
        fields = "__all__"


class NegativeFormatSerializer(serializers.ModelSerializer):
    """Serializer for NegativeFormat model."""

    class Meta:
        model = NegativeFormat
        fields = "__all__"


class OfficialSiteSerializer(serializers.ModelSerializer):
    """Serializer for OfficialSite model."""

    class Meta:
        model = OfficialSite
        fields = "__all__"


class PrintedFilmFormatSerializer(serializers.ModelSerializer):
    """Serializer for PrintedFilmFormat model."""

    class Meta:
        model = PrintedFilmFormat
        fields = "__all__"


class ProductionCompaniesSerializer(serializers.ModelSerializer):
    """Serializer for ProductionCompanies model."""

    class Meta:
        model = ProductionCompanies
        fields = "__all__"


class SoundMixSerializer(serializers.ModelSerializer):
    """Serializer for SoundMix model."""

    class Meta:
        model = SoundMix
        fields = "__all__"


class TicketRoomSerializer(serializers.ModelSerializer):
    """Serializer for TicketRoom model."""

    class Meta:
        model = TicketRoom
        fields = "__all__"


class LinkImgSerializer(serializers.ModelSerializer):
    """Serializer for LinkImg model."""

    class Meta:
        model = LinkImg
        fields = "__all__"


class LinkTrailerSerializer(serializers.ModelSerializer):
    """Serializer for LinkTrailer model."""

    class Meta:
        model = LinkTrailer
        fields = "__all__"
