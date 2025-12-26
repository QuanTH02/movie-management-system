"""
Admin configuration for users app.
"""

from django.contrib import admin

from apps.users.models import FollowFilmUser, LikeMovie


@admin.register(FollowFilmUser)
class FollowFilmUserAdmin(admin.ModelAdmin):
    """Admin for FollowFilmUser model."""

    list_display = ["follow_id", "user", "movie", "total_view"]
    search_fields = ["user__username", "movie__movie_name"]
    list_filter = ["total_view"]


@admin.register(LikeMovie)
class LikeMovieAdmin(admin.ModelAdmin):
    """Admin for LikeMovie model."""

    list_display = ["user_name", "movie"]
    search_fields = ["user_name", "movie__movie_name"]
