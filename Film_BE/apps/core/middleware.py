"""
Custom middleware for the core app.
"""

from django.utils.deprecation import MiddlewareMixin


class DisableCSRFForAPI(MiddlewareMixin):
    """
    Middleware to disable CSRF protection for API endpoints.
    This is safe because we use JWT authentication for API endpoints.
    """

    def process_request(self, request):
        """
        Disable CSRF check for API endpoints.
        """
        # Check if the request is for an API endpoint
        if request.path.startswith("/api/"):
            setattr(request, "_dont_enforce_csrf_checks", True)
        return None
