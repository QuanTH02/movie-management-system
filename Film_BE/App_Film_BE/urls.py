"""
Backward compatibility URLs for App_Film_BE.
Re-exports views from new apps to maintain backward compatibility.
"""

from django.urls import path

from App_Film_BE.views import (
    AccountListView,
    AspectRatioListView,
    AwardsListView,
    CameraListView,
    CastListView,
    CinematographicProcessListView,
    CinematographyListView,
    ColorProcessListView,
    CountryOriginListView,
    DidYouKnowListView,
    DirectorListView,
    EditingListView,
    FilmingLocationsListView,
    FilmListView,
    FilmReviewListView,
    GenresListView,
    ImgMovieView,
    LaboratoryListView,
    LanguageListView,
    LikeMovieView,
    LoginView,
    MovieListView,
    MusicListView,
    NegativeFormatListView,
    OfficialSiteListView,
    PrintedFilmFormatListView,
    ProducedListView,
    ProductionCompaniesListView,
    RatingFilmListView,
    RecommendCollaborativeView,
    RecommendContentBasedView,
    RegisterView,
    ReviewView,
    SoundMixListView,
    SpecialeffectsListView,
    TaglinesListView,
    TicketListView,
    TicketRoomDetailView,
    TicketRoomListView,
    TrailerMovieView,
    WritersListView,
)

app_name = "api"

urlpatterns = [
    # User
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("ticketroom/", TicketListView.as_view(), name="ticketroom-list"),
    path("review/", ReviewView.as_view(), name="review"),
    path("film/", FilmListView.as_view(), name="film-list"),
    path("account/", AccountListView.as_view(), name="account-list"),
    # Bảng trung gian
    path("movie/<str:movie_id>/award/", AwardsListView.as_view(), name="award-list"),
    path("movie/<str:movie_id>/director/", DirectorListView.as_view(), name="director-list"),
    path("movie/<str:movie_id>/camera/", CameraListView.as_view(), name="camera-list"),
    path("movie/<str:movie_id>/cast/", CastListView.as_view(), name="cast-list"),
    path("movie/<str:movie_id>/cinematography/", CinematographyListView.as_view(), name="cinematography-list"),
    path("movie/<str:movie_id>/editing/", EditingListView.as_view(), name="editing-list"),
    path("movie/<str:movie_id>/genres/", GenresListView.as_view(), name="genres-list"),
    path("movie/<str:movie_id>/music/", MusicListView.as_view(), name="music-list"),
    path("movie/<str:movie_id>/produced/", ProducedListView.as_view(), name="produced-list"),
    path("movie/<str:movie_id>/specialeffects/", SpecialeffectsListView.as_view(), name="specialeffects-list"),
    path("movie/<str:movie_id>/taglines/", TaglinesListView.as_view(), name="taglines-list"),
    path("movie/<str:movie_id>/writers/", WritersListView.as_view(), name="writers-list"),
    # Không bảng trung gian
    path("movie/<str:movie_id>/", MovieListView.as_view(), name="movie-list"),
    path("movie/<str:movie_id>/aspectratio/", AspectRatioListView.as_view(), name="aspectratio-list"),
    path(
        "movie/<str:movie_id>/cinematographicprocess/",
        CinematographicProcessListView.as_view(),
        name="cinematographicprocess-list",
    ),
    path("movie/<str:movie_id>/color/", ColorProcessListView.as_view(), name="color-list"),
    path("movie/<str:movie_id>/countryorigin/", CountryOriginListView.as_view(), name="countryorigin-list"),
    path("movie/<str:movie_id>/didyouknow/", DidYouKnowListView.as_view(), name="didyouknow-list"),
    path("movie/<str:movie_id>/filmreview/", FilmReviewListView.as_view(), name="filmreview-list"),
    path("movie/<str:movie_id>/filminglocations/", FilmingLocationsListView.as_view(), name="filminglocations-list"),
    path("movie/<str:movie_id>/laboratory/", LaboratoryListView.as_view(), name="laboratory-list"),
    path("movie/<str:movie_id>/language/", LanguageListView.as_view(), name="language-list"),
    path("movie/<str:movie_id>/negativeformat/", NegativeFormatListView.as_view(), name="negativeformat-list"),
    path("movie/<str:movie_id>/officialsite/", OfficialSiteListView.as_view(), name="officialsite-list"),
    path("movie/<str:movie_id>/printedfilmformat/", PrintedFilmFormatListView.as_view(), name="printedfilmformat-list"),
    path(
        "movie/<str:movie_id>/productioncompanies/",
        ProductionCompaniesListView.as_view(),
        name="productioncompanies-list",
    ),
    path("movie/<str:movie_id>/ratingfilm/", RatingFilmListView.as_view(), name="ratingfilm-list"),
    path("movie/<str:movie_id>/soundmix/", SoundMixListView.as_view(), name="soundmix-list"),
    path("movie/<str:movie_id>/ticketroom/", TicketRoomDetailView.as_view(), name="ticketroom-detail"),
    # Recommend
    path(
        "recommend/contentbased/<str:movie_id>/",
        RecommendContentBasedView.as_view(),
        name="recommend-contentbased-movies",
    ),
    path(
        "recommend/collaborative/<str:user_id>/",
        RecommendCollaborativeView.as_view(),
        name="recommend-collaborative-movies",
    ),
    # Trailer and Img
    path("movie/<str:movie_id>/linktrailer/", TrailerMovieView.as_view(), name="link_trailer_movie"),
    path("movie/<str:movie_id>/linkimg/", ImgMovieView.as_view(), name="link_img_movie"),
    # Like movie (backward compatibility - also available at /api/v1/users/liked-movies/)
    path("likemovie/", LikeMovieView.as_view(), name="like_movie"),
]
