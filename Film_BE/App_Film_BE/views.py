"""
Backward compatibility: Re-export views from new apps.
This file maintains backward compatibility with existing code that imports from App_Film_BE.views.
"""

from apps.movies.views import (
    AspectRatioListView,
    AwardsListView,
    CameraListView,
    CastListView,
    CinematographicProcessListView,
    CinematographyListView,
)
from apps.movies.views import ColorListView as ColorProcessListView
from apps.movies.views import (
    CountryOriginListView,
    DidYouKnowListView,
    DirectorListView,
    EditingListView,
    FilmingLocationsListView,
    FilmListView,
    GenresListView,
    LaboratoryListView,
    LanguageListView,
)
from apps.movies.views import MovieDetailView as MovieListView
from apps.movies.views import MovieImageView as ImgMovieView
from apps.movies.views import MovieTrailerView as TrailerMovieView
from apps.movies.views import (
    MusicListView,
    NegativeFormatListView,
    OfficialSiteListView,
    PrintedFilmFormatListView,
    ProducedListView,
    ProductionCompaniesListView,
    RecommendCollaborativeView,
    RecommendContentBasedView,
    SoundMixListView,
    SpecialeffectsListView,
    TaglinesListView,
    TicketRoomDetailView,
    TicketRoomListView,
    TrailerLinkView,
    WritersListView,
)
from apps.reviews.views import FilmReviewListView, ReviewView

# Import views from new apps for backward compatibility
from apps.users.views import AccountView as AccountListView
from apps.users.views import LikeMovieView, LoginView, RegisterView

# Alias for backward compatibility - TicketListView is the same as TicketRoomListView
TicketListView = TicketRoomListView

# Import RatingFilmListView - need to create this
from rest_framework import generics, status
from rest_framework.response import Response

from apps.core.exceptions import ResourceNotFoundException
from apps.movies.services.movie_query_service import MovieQueryService
from apps.reviews.models import RatingFilm
from apps.reviews.serializers import RatingFilmSerializer


class RatingFilmListView(generics.ListAPIView):
    """List rating films for a movie."""

    serializer_class = RatingFilmSerializer
    permission_classes = []

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        try:
            movie = MovieQueryService.get_movie_by_id_or_name(movie_id)
            return RatingFilm.objects.filter(movie__movie_id=movie.movie_id)
        except ResourceNotFoundException:
            return RatingFilm.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(
            {"message": "Successfully", "data": serializer.data},
            status=status.HTTP_200_OK,
        )
