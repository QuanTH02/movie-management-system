"""
URL configuration for users app.
"""

from django.urls import path

from apps.users.views import AccountView, LikeMovieView, LoginView, RegisterView, TokenRefreshView, TrackActivityView

app_name = "users"

urlpatterns = [
    # Authentication endpoints
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    # User account endpoints
    path("account/", AccountView.as_view(), name="account"),
    # User likes endpoints
    path("liked-movies/", LikeMovieView.as_view(), name="liked-movies"),
    # User activity tracking endpoints
    path("track-activity/", TrackActivityView.as_view(), name="track-activity"),
]
