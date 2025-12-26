"""
URL configuration for users app.
"""

from django.urls import path

from apps.users.views import AccountView, LikeMovieView, LoginView, RegisterView, TokenRefreshView

app_name = "users"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("account/", AccountView.as_view(), name="account"),
    path("like-movie/", LikeMovieView.as_view(), name="like-movie"),
]
