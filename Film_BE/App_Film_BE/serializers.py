from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Movieinformation,
    Awards,
    Director,
    Camera,
    Cast,
    Cinematography,
    Editing,
    Genres,
    Music,
    Produced,
    Specialeffects,
    Taglines,
    Writers,
    AspectRatio,
    # Không bảng trung gian
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
    FollowFilmUser,
)


# User
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class RegisterSerializer(serializers.Serializer):
    account = serializers.CharField()
    name = serializers.CharField()
    gmail = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")
        
        return data

class ReviewSerializer(serializers.Serializer):
    star_review = serializers.IntegerField()
    title_review = serializers.CharField()
    content_review = serializers.CharField()
    movie_name = serializers.CharField()
    name_review = serializers.CharField()


class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movieinformation
        fields = "__all__"


class AwardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Awards
        fields = "__all__"


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = "__all__"

class FilmDirectorSerializer(serializers.ModelSerializer):
    film = DirectorSerializer()
    class Meta:
        model = Movieinformation
        fields = "__all__"

class CastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cast
        fields = "__all__"


class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = "__all__"


class CinematographySerializer(serializers.ModelSerializer):
    class Meta:
        model = Cinematography
        fields = "__all__"


class EditingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Editing
        fields = "__all__"


class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = "__all__"


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = "__all__"


class ProducedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produced
        fields = "__all__"

class SpecialeffectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialeffects
        fields = "__all__"

class TaglinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taglines
        fields = "__all__"

class WritersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Writers
        fields = "__all__"


# Không bảng trung gian
class AspectRatiosSerializer(serializers.ModelSerializer):
    class Meta:
        model = AspectRatio
        fields = "__all__"

class CinematographicProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = CinematographicProcess
        fields = "__all__"

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = "__all__"

class CountryOriginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryOrigin
        fields = "__all__"

class DidYouKnowSerializer(serializers.ModelSerializer):
    class Meta:
        model = DidYouKnow
        fields = "__all__"

class FilmReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmReview
        fields = ['movie', 'name_review', 'star_review', 'title_review', 'content_review', 'date_review']

    def create(self, validated_data):
        movie_name = validated_data.pop('movie_name')
        movie = Movieinformation.objects.get(movie_name=movie_name)
        validated_data['movie'] = movie
        return super().create(validated_data)

class FilmingLocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmingLocations
        fields = "__all__"

class LaboratorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratory
        fields = "__all__"

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = "__all__"
    
class NegativeFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = NegativeFormat
        fields = "__all__"

class OfficialSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficialSite
        fields = "__all__"

class PrintedFilmFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintedFilmFormat
        fields = "__all__"

class ProductionCompaniesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionCompanies
        fields = "__all__"

class RatingFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingFilm
        fields = "__all__"

class SoundMixSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoundMix
        fields = "__all__"

class TicketRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketRoom
        fields = "__all__"


# Thêm
class FollowFilmUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowFilmUser
        fields = "__all__"

class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']

# Trailer
class LinkTrailerSerializer(serializers.Serializer):
    link_trailer = serializers.CharField()

class LinkImgSerializer(serializers.Serializer):
    link_img = serializers.CharField()