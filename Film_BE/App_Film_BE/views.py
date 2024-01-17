from rest_framework import generics
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
from .serializers import (
    FilmSerializer,
    AwardsSerializer,
    DirectorSerializer,
    CameraSerializer,
    CastSerializer,
    CinematographySerializer,
    EditingSerializer,
    GenresSerializer,
    MusicSerializer,
    ProducedSerializer,
    SpecialeffectsSerializer,
    TaglinesSerializer,
    WritersSerializer,
    AspectRatiosSerializer,
    CinematographicProcessSerializer,
    ColorSerializer,
    CountryOriginSerializer,
    DidYouKnowSerializer,
    FilmReviewSerializer,
    FilmingLocationsSerializer,
    LaboratorySerializer,
    LanguageSerializer,
    NegativeFormatSerializer,
    OfficialSiteSerializer,
    PrintedFilmFormatSerializer,
    ProductionCompaniesSerializer,
    RatingFilmSerializer,
    SoundMixSerializer,
    TicketRoomSerializer,
)


class FilmListView(generics.ListAPIView):
    serializer_class = FilmSerializer

    def get_queryset(self):
        return Movieinformation.objects.all()


class AwardsListView(generics.ListAPIView):
    serializer_class = AwardsSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return Awards.objects.filter(movie__movie_id=movie_id)


class DirectorListView(generics.ListAPIView):
    serializer_class = DirectorSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_directors = MovieDirector.objects.filter(movie_id=movie_id)
        director_ids = movie_directors.values_list("director_id", flat=True)
        directors = Director.objects.filter(director_id__in=director_ids)
        return directors


class CameraListView(generics.ListAPIView):
    serializer_class = CameraSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return Camera.objects.filter(movie__movie_id=movie_id)


class CastListView(generics.ListAPIView):
    serializer_class = CastSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_casts = MovieCast.objects.filter(movie_id=movie_id)
        cast_ids = movie_casts.values_list("cast_id", flat=True)
        casts = Cast.objects.filter(cast_id__in=cast_ids)
        return casts


class CinematographyListView(generics.ListAPIView):
    serializer_class = CinematographySerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_cinematography = MovieCinematography.objects.filter(movie_id=movie_id)
        cinematography_ids = movie_cinematography.values_list(
            "cinematography_id", flat=True
        )
        cinematographys = Cinematography.objects.filter(
            cinematography_id__in=cinematography_ids
        )
        return cinematographys


class EditingListView(generics.ListAPIView):
    serializer_class = EditingSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_editing = MovieEditing.objects.filter(movie_id=movie_id)
        editing_ids = movie_editing.values_list("editing_id", flat=True)
        editings = Editing.objects.filter(editing_id__in=editing_ids)
        return editings


class GenresListView(generics.ListAPIView):
    serializer_class = GenresSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_genres = MovieGenres.objects.filter(movie_id=movie_id)
        genres_ids = movie_genres.values_list("genres_id", flat=True)
        genress = Genres.objects.filter(genres_id__in=genres_ids)
        return genress

class MusicListView(generics.ListAPIView):
    serializer_class = MusicSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_music = MovieMusic.objects.filter(movie_id=movie_id)
        music_ids = movie_music.values_list("music_id", flat=True)
        musics = Music.objects.filter(music_id__in=music_ids)
        return musics
    
class ProducedListView(generics.ListAPIView):
    serializer_class = ProducedSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_produced = MovieProduced.objects.filter(movie_id=movie_id)
        produced_ids = movie_produced.values_list("produced_id", flat=True)
        produceds = Produced.objects.filter(produced_id__in=produced_ids)
        return produceds

class SpecialeffectsListView(generics.ListAPIView):
    serializer_class = SpecialeffectsSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_specialeffects = MovieSpecialeffects.objects.filter(movie_id=movie_id)
        specialeffects_ids = movie_specialeffects.values_list("special_effect_id", flat=True)
        specialeffects = Specialeffects.objects.filter(special_effect_id__in=specialeffects_ids)
        return specialeffects

class TaglinesListView(generics.ListAPIView):
    serializer_class = TaglinesSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_taglines = MovieTaglines.objects.filter(movie_id=movie_id)
        taglines_ids = movie_taglines.values_list("taglines_id", flat=True)
        taglines = Taglines.objects.filter(taglines_id__in=taglines_ids)
        return taglines

class WritersListView(generics.ListAPIView):
    serializer_class = WritersSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        movie_writers = MovieWriters.objects.filter(movie_id=movie_id)
        writers_ids = movie_writers.values_list("writers_id", flat=True)
        writers = Writers.objects.filter(writers_id__in=writers_ids)
        return writers

# Không bảng trung gian
class AspectRatioListView(generics.ListAPIView):
    serializer_class = AspectRatiosSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return AspectRatio.objects.filter(movie__movie_id=movie_id)
    
class CinematographicProcessListView(generics.ListAPIView):
    serializer_class = CinematographicProcessSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return CinematographicProcess.objects.filter(movie__movie_id=movie_id)

class ColorProcessListView(generics.ListAPIView):
    serializer_class = ColorSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return Color.objects.filter(movie__movie_id=movie_id)

class CountryOriginListView(generics.ListAPIView):
    serializer_class = CountryOriginSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return CountryOrigin.objects.filter(movie__movie_id=movie_id)

class DidYouKnowListView(generics.ListAPIView):
    serializer_class = DidYouKnowSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return DidYouKnow.objects.filter(movie__movie_id=movie_id)

class FilmReviewListView(generics.ListAPIView):
    serializer_class = FilmReviewSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return FilmReview.objects.filter(movie__movie_id=movie_id)

class FilmingLocationsListView(generics.ListAPIView):
    serializer_class = FilmingLocationsSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return FilmingLocations.objects.filter(movie__movie_id=movie_id)

class LaboratoryListView(generics.ListAPIView):
    serializer_class = LaboratorySerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return Laboratory.objects.filter(movie__movie_id=movie_id)

class LanguageListView(generics.ListAPIView):
    serializer_class = LanguageSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return Language.objects.filter(movie__movie_id=movie_id)
    
class NegativeFormatListView(generics.ListAPIView):
    serializer_class = NegativeFormatSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return NegativeFormat.objects.filter(movie__movie_id=movie_id)
    
class OfficialSiteListView(generics.ListAPIView):
    serializer_class = OfficialSiteSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return OfficialSite.objects.filter(movie__movie_id=movie_id)

class PrintedFilmFormatListView(generics.ListAPIView):
    serializer_class = PrintedFilmFormatSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return PrintedFilmFormat.objects.filter(movie__movie_id=movie_id)
    
class ProductionCompaniesListView(generics.ListAPIView):
    serializer_class = ProductionCompaniesSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return ProductionCompanies.objects.filter(movie__movie_id=movie_id)

class RatingFilmListView(generics.ListAPIView):
    serializer_class = RatingFilmSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return RatingFilm.objects.filter(movie__movie_id=movie_id)

class SoundMixListView(generics.ListAPIView):
    serializer_class = SoundMixSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return SoundMix.objects.filter(movie__movie_id=movie_id)

class TicketRoomListView(generics.ListAPIView):
    serializer_class = TicketRoomSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return TicketRoom.objects.filter(movie__movie_id=movie_id)

# Create your views here.
