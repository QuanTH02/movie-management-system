"""
URL configuration for movies app.
"""

from django.urls import path

from apps.movies.views import (
    AspectRatioListView,
    AwardsListView,
    CameraListView,
    CastListView,
    CinematographicProcessListView,
    CinematographyListView,
    ColorListView,
    CountryOriginListView,
    DidYouKnowListView,
    DirectorListView,
    EditingListView,
    FilmingLocationsListView,
    FilmListView,
    GenresListView,
    LaboratoryListView,
    LanguageListView,
    MovieDetailView,
    MovieImageView,
    MovieTrailerView,
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

app_name = "movies"

urlpatterns = [
    # Movie list and detail
    path("", FilmListView.as_view(), name="film-list"),
    path("<str:movie_id>/", MovieDetailView.as_view(), name="movie-detail"),
    # Ticket room
    path("ticket-room/", TicketRoomListView.as_view(), name="ticket-room-list"),
    path("<str:movie_id>/ticket-room/", TicketRoomDetailView.as_view(), name="ticket-room-detail"),
    # Recommendations
    path(
        "recommend/content-based/<str:movie_id>/", RecommendContentBasedView.as_view(), name="recommend-content-based"
    ),
    path(
        "recommend/collaborative/<str:user_id>/", RecommendCollaborativeView.as_view(), name="recommend-collaborative"
    ),
    # Media
    path("trailer-link/<path:link_page_trailer>/", TrailerLinkView.as_view(), name="trailer-link"),
    path("<str:movie_id>/trailer/", MovieTrailerView.as_view(), name="movie-trailer"),
    path("<str:movie_id>/images/", MovieImageView.as_view(), name="movie-images"),
    # Movie metadata (with junction tables)
    path("<str:movie_id>/awards/", AwardsListView.as_view(), name="awards-list"),
    path("<str:movie_id>/directors/", DirectorListView.as_view(), name="directors-list"),
    path("<str:movie_id>/cast/", CastListView.as_view(), name="cast-list"),
    path("<str:movie_id>/cinematography/", CinematographyListView.as_view(), name="cinematography-list"),
    path("<str:movie_id>/editing/", EditingListView.as_view(), name="editing-list"),
    path("<str:movie_id>/genres/", GenresListView.as_view(), name="genres-list"),
    path("<str:movie_id>/music/", MusicListView.as_view(), name="music-list"),
    path("<str:movie_id>/produced/", ProducedListView.as_view(), name="produced-list"),
    path("<str:movie_id>/special-effects/", SpecialeffectsListView.as_view(), name="special-effects-list"),
    path("<str:movie_id>/taglines/", TaglinesListView.as_view(), name="taglines-list"),
    path("<str:movie_id>/writers/", WritersListView.as_view(), name="writers-list"),
    # Movie metadata (without junction tables)
    path("<str:movie_id>/aspect-ratio/", AspectRatioListView.as_view(), name="aspect-ratio-list"),
    path("<str:movie_id>/camera/", CameraListView.as_view(), name="camera-list"),
    path(
        "<str:movie_id>/cinematographic-process/",
        CinematographicProcessListView.as_view(),
        name="cinematographic-process-list",
    ),
    path("<str:movie_id>/color/", ColorListView.as_view(), name="color-list"),
    path("<str:movie_id>/country-origin/", CountryOriginListView.as_view(), name="country-origin-list"),
    path("<str:movie_id>/did-you-know/", DidYouKnowListView.as_view(), name="did-you-know-list"),
    path("<str:movie_id>/filming-locations/", FilmingLocationsListView.as_view(), name="filming-locations-list"),
    path("<str:movie_id>/laboratory/", LaboratoryListView.as_view(), name="laboratory-list"),
    path("<str:movie_id>/language/", LanguageListView.as_view(), name="language-list"),
    path("<str:movie_id>/negative-format/", NegativeFormatListView.as_view(), name="negative-format-list"),
    path("<str:movie_id>/official-site/", OfficialSiteListView.as_view(), name="official-site-list"),
    path("<str:movie_id>/printed-film-format/", PrintedFilmFormatListView.as_view(), name="printed-film-format-list"),
    path(
        "<str:movie_id>/production-companies/", ProductionCompaniesListView.as_view(), name="production-companies-list"
    ),
    path("<str:movie_id>/sound-mix/", SoundMixListView.as_view(), name="sound-mix-list"),
]
