"""
Backward compatibility: Re-export serializers from new apps.
This file maintains backward compatibility with existing code that imports from App_Film_BE.serializers.
"""

# Import all serializers from new apps for backward compatibility
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
from apps.reviews.serializers import FilmReviewSerializer, RatingFilmSerializer, ReviewSerializer
from apps.users.serializers import (
    AccountSerializer,
    FollowFilmUserSerializer,
    LikeMovieSerializer,
    LoginSerializer,
    RegisterSerializer,
)
