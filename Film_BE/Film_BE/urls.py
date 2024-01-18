"""
URL configuration for Film_BE project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from App_Film_BE.views import (
    LoginView,
    RegisterView,
    ReviewView,

    FilmListView, 
    AwardsListView, 
    DirectorListView, 
    CameraListView, 
    CastListView, 
    CinematographyListView, 
    EditingListView, 
    GenresListView, 
    MusicListView, 
    ProducedListView, 
    SpecialeffectsListView, 
    TaglinesListView,
    WritersListView,
    # Không bảng trung gian
    AspectRatioListView,
    MovieListView,
    CinematographicProcessListView,
    ColorProcessListView,
    CountryOriginListView,
    DidYouKnowListView,
    FilmReviewListView,
    FilmingLocationsListView,
    LaboratoryListView,
    LanguageListView,
    NegativeFormatListView,
    OfficialSiteListView,
    PrintedFilmFormatListView,
    ProductionCompaniesListView,
    RatingFilmListView,
    SoundMixListView,
    TicketRoomListView,
    TicketListView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # User
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/ticketroom/', TicketListView.as_view(), name='ticketroom-list'),
    path('api/review/', ReviewView.as_view(), name='review'),
    path('api/film/', FilmListView.as_view(), name='film-list'),

    # Bảng trung gian
    path('api/movie/<str:movie_id>/award/', AwardsListView.as_view(), name='award-list'),
    path('api/movie/<str:movie_id>/director/', DirectorListView.as_view(), name='director-list'),
    path('api/movie/<str:movie_id>/camera/', CameraListView.as_view(), name='camera-list'),
    path('api/movie/<str:movie_id>/cast/', CastListView.as_view(), name='cast-list'),
    path('api/movie/<str:movie_id>/cinematography/', CinematographyListView.as_view(), name='cinematography-list'),
    path('api/movie/<str:movie_id>/editing/', EditingListView.as_view(), name='editing-list'),
    path('api/movie/<str:movie_id>/genres/', GenresListView.as_view(), name='genres-list'),
    path('api/movie/<str:movie_id>/music/', MusicListView.as_view(), name='music-list'),
    path('api/movie/<str:movie_id>/produced/', ProducedListView.as_view(), name='produced-list'),
    path('api/movie/<str:movie_id>/specialeffects/', SpecialeffectsListView.as_view(), name='specialeffects-list'),
    path('api/movie/<str:movie_id>/taglines/', TaglinesListView.as_view(), name='taglines-list'),
    path('api/movie/<str:movie_id>/writers/', WritersListView.as_view(), name='writers-list'),

    # Không bảng trung gian
    path('api/movie/<str:movie_id>/', MovieListView.as_view(), name='movie-list'),
    path('api/movie/<str:movie_id>/aspectratio/', AspectRatioListView.as_view(), name='aspectratio-list'),
    path('api/movie/<str:movie_id>/cinematographicprocess/', CinematographicProcessListView.as_view(), name='cinematographicprocess-list'),
    path('api/movie/<str:movie_id>/color/', ColorProcessListView.as_view(), name='color-list'),
    path('api/movie/<str:movie_id>/countryorigin/', CountryOriginListView.as_view(), name='countryorigin-list'),
    path('api/movie/<str:movie_id>/didyouknow/', DidYouKnowListView.as_view(), name='didyouknow-list'),
    path('api/movie/<str:movie_id>/filmreview/', FilmReviewListView.as_view(), name='filmreview-list'),
    path('api/movie/<str:movie_id>/filminglocations/', FilmingLocationsListView.as_view(), name='filminglocations-list'),
    path('api/movie/<str:movie_id>/laboratory/', LaboratoryListView.as_view(), name='laboratory-list'),
    path('api/movie/<str:movie_id>/language/', LanguageListView.as_view(), name='language-list'),
    path('api/movie/<str:movie_id>/negativeformat/', NegativeFormatListView.as_view(), name='negativeformat-list'),
    path('api/movie/<str:movie_id>/officialsite/', OfficialSiteListView.as_view(), name='officialsite-list'),
    path('api/movie/<str:movie_id>/printedfilmformat/', PrintedFilmFormatListView.as_view(), name='printedfilmformat-list'),
    path('api/movie/<str:movie_id>/productioncompanies/', ProductionCompaniesListView.as_view(), name='productioncompanies-list'),
    path('api/movie/<str:movie_id>/ratingfilm/', RatingFilmListView.as_view(), name='ratingfilm-list'),
    path('api/movie/<str:movie_id>/soundmix/', SoundMixListView.as_view(), name='soundmix-list'),
    path('api/movie/<str:movie_id>/ticketroom/', TicketRoomListView.as_view(), name='ticketroom-list'),
]

