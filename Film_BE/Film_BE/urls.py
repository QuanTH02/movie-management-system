"""
URL configuration for Film_BE project.
"""

from django.contrib import admin
from django.urls import include, path

# Include app URLs
urlpatterns = [
    path("admin/", admin.site.urls),
    # New app URLs
    path("api/v1/users/", include("apps.users.urls")),
    path("api/v1/reviews/", include("apps.reviews.urls")),
    path("api/v1/movies/", include("apps.movies.urls")),
    # Backward compatibility - keep old URLs
    path("api/", include("App_Film_BE.urls")),
]
