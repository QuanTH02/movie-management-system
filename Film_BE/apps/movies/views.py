"""
Views for movies app.
Handles movie listing, detail, metadata, recommendations, and media operations.
"""

from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

# Import trailer function
from App_Film_BE.Func.link_trailer import main_link_trailer
from apps.core.exceptions import ResourceNotFoundException
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
from apps.movies.serializers import (
    AspectRatiosSerializer,
    AwardsSerializer,
    CameraSerializer,
    CastSerializer,
    CinematographicProcessSerializer,
    CinematographySerializer,
    ColorSerializer,
    CountryOriginSerializer,
    DidYouKnowSerializer,
    DirectorSerializer,
    EditingSerializer,
    FilmingLocationsSerializer,
    FilmSerializer,
    GenresSerializer,
    LaboratorySerializer,
    LanguageSerializer,
    LinkImgSerializer,
    LinkTrailerSerializer,
    MusicSerializer,
    NegativeFormatSerializer,
    OfficialSiteSerializer,
    PrintedFilmFormatSerializer,
    ProducedSerializer,
    ProductionCompaniesSerializer,
    SoundMixSerializer,
    SpecialeffectsSerializer,
    TaglinesSerializer,
    TicketRoomSerializer,
    WritersSerializer,
)
from apps.movies.services.movie_data_service import MovieDataService
from apps.movies.services.movie_query_service import MovieQueryService
from apps.movies.services.recommendation_service import RecommendationService


class FilmListView(APIView):
    """
    List all movies endpoint.

    GET:
    Returns a list of all movies with processed votes and ratings.

    Returns:
    - 200 OK: List of movies
    """

    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Movieinformation.objects.all()

        # Process votes and ratings for each movie
        processed_movies = []
        for movie in queryset:
            processed_movie = MovieDataService.process_movie_votes_and_rating(movie)
            processed_movies.append(processed_movie)

        serializer = FilmSerializer(processed_movies, many=True)
        return Response(
            {"message": "Successfully", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


class MovieDetailView(APIView):
    """
    Get movie detail by ID or name.

    GET:
    URL parameter:
    - movie_id: Movie ID or name (from URL)

    POST:
    Request body:
    - movie_id (optional): Movie ID or name

    URL parameter:
    - movie_id: Movie ID or name (from URL)

    Returns:
    - 200 OK: Movie detail
    - 404 Not Found: Movie not found
    """

    permission_classes = [AllowAny]

    def get(self, request, movie_id):
        """GET method to retrieve movie detail by ID or name from URL."""
        try:
            movie = MovieQueryService.get_movie_by_id_or_name(movie_id)
            processed_movie = MovieDataService.process_movie_votes_and_rating(movie)
            serializer = FilmSerializer(processed_movie)
            return Response(
                {"message": "Successfully", "data": [serializer.data]},
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request, movie_id=None):
        """POST method for backward compatibility."""
        movie_identifier = movie_id or request.data.get("movie_id")
        if not movie_identifier:
            return Response(
                {"message": "movie_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            movie = MovieQueryService.get_movie_by_id_or_name(movie_identifier)
            processed_movie = MovieDataService.process_movie_votes_and_rating(movie)
            serializer = FilmSerializer(processed_movie)
            return Response(
                {"message": "Successfully", "data": [serializer.data]},
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )


class TicketRoomListView(APIView):
    """
    List ticket room data with top grossing movies.

    GET:
    Returns ticket room data and top 12 grossing movies.

    Returns:
    - 200 OK: Ticket room data and top grossing movies
    """

    permission_classes = [AllowAny]

    def get(self, request):
        # Get all ticket rooms
        ticket_rooms = TicketRoom.objects.all()
        processed_ticket_rooms = [MovieDataService.process_ticket_room_gross(tr) for tr in ticket_rooms]

        # Get top grossing movies
        top_movies = MovieDataService.get_top_grossing_movies(limit=12)

        ticket_serializer = TicketRoomSerializer(processed_ticket_rooms, many=True)
        movie_serializer = FilmSerializer(top_movies, many=True)

        return Response(
            {
                "message": "Successfully",
                "data": ticket_serializer.data,
                "data_top": movie_serializer.data,
            },
            status=status.HTTP_200_OK,
        )


# Alias for backward compatibility
TicketListView = TicketRoomListView


class TicketRoomDetailView(APIView):
    """
    Get ticket room data for a specific movie.

    GET:
    URL parameter:
    - movie_id: Movie ID or name

    Returns:
    - 200 OK: Ticket room data
    - 404 Not Found: Movie not found
    """

    permission_classes = [AllowAny]

    def get(self, request, movie_id):
        try:
            movie = MovieQueryService.get_movie_by_id_or_name(movie_id)
            ticket_rooms = TicketRoom.objects.filter(movie__movie_id=movie.movie_id)
            processed_ticket_rooms = [MovieDataService.process_ticket_room_gross(tr) for tr in ticket_rooms]

            # Get top grossing movies (with error handling)
            try:
                top_movies = MovieDataService.get_top_grossing_movies(limit=12)
            except Exception as e:
                # Log error but don't fail the request
                import logging

                logger = logging.getLogger(__name__)
                logger.warning(f"Error getting top grossing movies: {str(e)}")
                top_movies = []

            ticket_serializer = TicketRoomSerializer(processed_ticket_rooms, many=True)
            movie_serializer = FilmSerializer(top_movies, many=True)

            return Response(
                {
                    "message": "Successfully",
                    "data": ticket_serializer.data,
                    "data_top": movie_serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            import logging

            logger = logging.getLogger(__name__)
            logger.error(f"Error in TicketRoomDetailView: {str(e)}", exc_info=True)
            return Response(
                {"message": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class RecommendContentBasedView(APIView):
    """
    Get content-based movie recommendations.

    GET:
    URL parameter:
    - movie_id: Movie ID or name

    Returns:
    - 200 OK: List of recommended movies
    - 404 Not Found: Movie not found or recommendation error
    """

    permission_classes = [AllowAny]

    def get(self, request, movie_id):
        try:
            recommended_movies = RecommendationService.get_content_based_recommendations(movie_id)
            serializer = FilmSerializer(recommended_movies, many=True)
            return Response(
                {"message": "Successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )


class RecommendCollaborativeView(APIView):
    """
    Get collaborative filtering movie recommendations.

    GET:
    URL parameter:
    - user_id: User ID or username

    Returns:
    - 200 OK: List of recommended movies
    - 404 Not Found: User not found or recommendation error
    """

    permission_classes = [AllowAny]

    def get(self, request, user_id):
        try:
            recommended_movies = RecommendationService.get_collaborative_recommendations(user_id, limit=12)
            serializer = FilmSerializer(recommended_movies, many=True)
            return Response(
                {"message": "Successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )


class TrailerLinkView(APIView):
    """
    Get trailer link from page URL.

    GET:
    URL parameter:
    - link_page_trailer: Page URL containing trailer

    Returns:
    - 200 OK: Trailer link
    """

    permission_classes = [AllowAny]

    def get(self, request, link_page_trailer):
        link_trailer = main_link_trailer(link_page_trailer)
        return Response(
            {"message": "Successfully", "data": [{"link_trailer": link_trailer}]},
            status=status.HTTP_200_OK,
        )


class MovieTrailerView(APIView):
    """
    Get trailer links for a movie.

    GET:
    URL parameter:
    - movie_id: Movie ID or name

    Returns:
    - 200 OK: List of trailer links
    - 404 Not Found: Movie not found
    """

    permission_classes = [AllowAny]

    def get(self, request, movie_id):
        try:
            movie = MovieQueryService.get_movie_by_id_or_name(movie_id)
            movie_trailers = MovieTrailer.objects.filter(movie=movie.movie_id)
            link_trailer_ids = movie_trailers.values_list("link_trailler_id", flat=True)
            link_trailers = LinkTrailer.objects.filter(link_trailler_id__in=link_trailer_ids)

            serializer = LinkTrailerSerializer(link_trailers, many=True)
            return Response(
                {"message": "Successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )


class MovieImageView(APIView):
    """
    Get image links for a movie.

    GET:
    URL parameter:
    - movie_id: Movie ID or name

    Returns:
    - 200 OK: List of image links
    - 404 Not Found: Movie not found
    """

    permission_classes = [AllowAny]

    def get(self, request, movie_id):
        try:
            movie = MovieQueryService.get_movie_by_id_or_name(movie_id)
            movie_imgs = MovieImg.objects.filter(movie=movie.movie_id)
            link_img_ids = movie_imgs.values_list("link_img_id", flat=True)
            link_imgs = LinkImg.objects.filter(link_img_id__in=link_img_ids)

            serializer = LinkImgSerializer(link_imgs, many=True)
            return Response(
                {"message": "Successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )


# Base class for movie metadata views
class MovieMetadataListView(generics.ListAPIView):
    """
    Base view for listing movie metadata.
    Subclasses should set serializer_class and implement get_queryset_by_movie.
    """

    permission_classes = [AllowAny]

    def get_queryset_by_movie(self, movie):
        """Override this method in subclasses."""
        raise NotImplementedError

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        try:
            movie = MovieQueryService.get_movie_by_id_or_name(movie_id)
            return self.get_queryset_by_movie(movie)
        except ResourceNotFoundException:
            return self.model.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(
            {"message": "Successfully", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


# Movie metadata views using junction tables
class AwardsListView(MovieMetadataListView):
    """List awards for a movie."""

    serializer_class = AwardsSerializer
    model = Awards

    def get_queryset_by_movie(self, movie):
        return Awards.objects.filter(movie__movie_id=movie.movie_id)


class DirectorListView(MovieMetadataListView):
    """List directors for a movie."""

    serializer_class = DirectorSerializer
    model = Director

    def get_queryset_by_movie(self, movie):
        movie_directors = MovieDirector.objects.filter(movie_id=movie.movie_id)
        director_ids = movie_directors.values_list("director_id", flat=True)
        return Director.objects.filter(director_id__in=director_ids)


class CastListView(MovieMetadataListView):
    """List cast for a movie."""

    serializer_class = CastSerializer
    model = Cast

    def get_queryset_by_movie(self, movie):
        movie_casts = MovieCast.objects.filter(movie_id=movie.movie_id)
        cast_ids = movie_casts.values_list("cast_id", flat=True)
        return Cast.objects.filter(cast_id__in=cast_ids)


class CinematographyListView(MovieMetadataListView):
    """List cinematography for a movie."""

    serializer_class = CinematographySerializer
    model = Cinematography

    def get_queryset_by_movie(self, movie):
        movie_cinematography = MovieCinematography.objects.filter(movie_id=movie.movie_id)
        cinematography_ids = movie_cinematography.values_list("cinematography_id", flat=True)
        return Cinematography.objects.filter(cinematography_id__in=cinematography_ids)


class EditingListView(MovieMetadataListView):
    """List editing for a movie."""

    serializer_class = EditingSerializer
    model = Editing

    def get_queryset_by_movie(self, movie):
        movie_editing = MovieEditing.objects.filter(movie_id=movie.movie_id)
        editing_ids = movie_editing.values_list("editing_id", flat=True)
        return Editing.objects.filter(editing_id__in=editing_ids)


class GenresListView(MovieMetadataListView):
    """List genres for a movie."""

    serializer_class = GenresSerializer
    model = Genres

    def get_queryset_by_movie(self, movie):
        movie_genres = MovieGenres.objects.filter(movie_id=movie.movie_id)
        genres_ids = movie_genres.values_list("genres_id", flat=True)
        return Genres.objects.filter(genres_id__in=genres_ids)


class MusicListView(MovieMetadataListView):
    """List music for a movie."""

    serializer_class = MusicSerializer
    model = Music

    def get_queryset_by_movie(self, movie):
        movie_music = MovieMusic.objects.filter(movie_id=movie.movie_id)
        music_ids = movie_music.values_list("music_id", flat=True)
        return Music.objects.filter(music_id__in=music_ids)


class ProducedListView(MovieMetadataListView):
    """List produced for a movie."""

    serializer_class = ProducedSerializer
    model = Produced

    def get_queryset_by_movie(self, movie):
        movie_produced = MovieProduced.objects.filter(movie_id=movie.movie_id)
        produced_ids = movie_produced.values_list("produced_id", flat=True)
        return Produced.objects.filter(produced_id__in=produced_ids)


class SpecialeffectsListView(MovieMetadataListView):
    """List special effects for a movie."""

    serializer_class = SpecialeffectsSerializer
    model = Specialeffects

    def get_queryset_by_movie(self, movie):
        movie_specialeffects = MovieSpecialeffects.objects.filter(movie_id=movie.movie_id)
        specialeffects_ids = movie_specialeffects.values_list("special_effect_id", flat=True)
        return Specialeffects.objects.filter(special_effect_id__in=specialeffects_ids)


class TaglinesListView(MovieMetadataListView):
    """List taglines for a movie."""

    serializer_class = TaglinesSerializer
    model = Taglines

    def get_queryset_by_movie(self, movie):
        movie_taglines = MovieTaglines.objects.filter(movie_id=movie.movie_id)
        taglines_ids = movie_taglines.values_list("taglines_id", flat=True)
        return Taglines.objects.filter(taglines_id__in=taglines_ids)


class WritersListView(MovieMetadataListView):
    """List writers for a movie."""

    serializer_class = WritersSerializer
    model = Writers

    def get_queryset_by_movie(self, movie):
        movie_writers = MovieWriters.objects.filter(movie_id=movie.movie_id)
        writers_ids = movie_writers.values_list("writers_id", flat=True)
        return Writers.objects.filter(writers_id__in=writers_ids)


# Movie metadata views without junction tables
class CameraListView(MovieMetadataListView):
    """List cameras for a movie."""

    serializer_class = CameraSerializer
    model = Camera

    def get_queryset_by_movie(self, movie):
        return Camera.objects.filter(movie__movie_id=movie.movie_id)


class AspectRatioListView(MovieMetadataListView):
    """List aspect ratios for a movie."""

    serializer_class = AspectRatiosSerializer
    model = AspectRatio

    def get_queryset_by_movie(self, movie):
        return AspectRatio.objects.filter(movie__movie_id=movie.movie_id)


class CinematographicProcessListView(MovieMetadataListView):
    """List cinematographic processes for a movie."""

    serializer_class = CinematographicProcessSerializer
    model = CinematographicProcess

    def get_queryset_by_movie(self, movie):
        return CinematographicProcess.objects.filter(movie__movie_id=movie.movie_id)


class ColorListView(MovieMetadataListView):
    """List colors for a movie."""

    serializer_class = ColorSerializer
    model = Color

    def get_queryset_by_movie(self, movie):
        return Color.objects.filter(movie__movie_id=movie.movie_id)


class CountryOriginListView(MovieMetadataListView):
    """List country origins for a movie."""

    serializer_class = CountryOriginSerializer
    model = CountryOrigin

    def get_queryset_by_movie(self, movie):
        return CountryOrigin.objects.filter(movie__movie_id=movie.movie_id)


class DidYouKnowListView(MovieMetadataListView):
    """List did you know items for a movie."""

    serializer_class = DidYouKnowSerializer
    model = DidYouKnow

    def get_queryset_by_movie(self, movie):
        return DidYouKnow.objects.filter(movie__movie_id=movie.movie_id)


class FilmingLocationsListView(MovieMetadataListView):
    """List filming locations for a movie."""

    serializer_class = FilmingLocationsSerializer
    model = FilmingLocations

    def get_queryset_by_movie(self, movie):
        return FilmingLocations.objects.filter(movie__movie_id=movie.movie_id)


class LaboratoryListView(MovieMetadataListView):
    """List laboratories for a movie."""

    serializer_class = LaboratorySerializer
    model = Laboratory

    def get_queryset_by_movie(self, movie):
        return Laboratory.objects.filter(movie__movie_id=movie.movie_id)


class LanguageListView(MovieMetadataListView):
    """List languages for a movie."""

    serializer_class = LanguageSerializer
    model = Language

    def get_queryset_by_movie(self, movie):
        return Language.objects.filter(movie__movie_id=movie.movie_id)


class NegativeFormatListView(MovieMetadataListView):
    """List negative formats for a movie."""

    serializer_class = NegativeFormatSerializer
    model = NegativeFormat

    def get_queryset_by_movie(self, movie):
        return NegativeFormat.objects.filter(movie__movie_id=movie.movie_id)


class OfficialSiteListView(MovieMetadataListView):
    """List official sites for a movie."""

    serializer_class = OfficialSiteSerializer
    model = OfficialSite

    def get_queryset_by_movie(self, movie):
        return OfficialSite.objects.filter(movie__movie_id=movie.movie_id)


class PrintedFilmFormatListView(MovieMetadataListView):
    """List printed film formats for a movie."""

    serializer_class = PrintedFilmFormatSerializer
    model = PrintedFilmFormat

    def get_queryset_by_movie(self, movie):
        return PrintedFilmFormat.objects.filter(movie__movie_id=movie.movie_id)


class ProductionCompaniesListView(MovieMetadataListView):
    """List production companies for a movie."""

    serializer_class = ProductionCompaniesSerializer
    model = ProductionCompanies

    def get_queryset_by_movie(self, movie):
        return ProductionCompanies.objects.filter(movie__movie_id=movie.movie_id)


class SoundMixListView(MovieMetadataListView):
    """List sound mixes for a movie."""

    serializer_class = SoundMixSerializer
    model = SoundMix

    def get_queryset_by_movie(self, movie):
        return SoundMix.objects.filter(movie__movie_id=movie.movie_id)
