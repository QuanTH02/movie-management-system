"""
Custom authentication classes for JWT authentication.
"""

from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication class.
    Extends JWTAuthentication to provide custom error handling.
    Uses the parent class implementation for token validation.
    """

    def authenticate(self, request):
        """
        Authenticate the request and return a two-tuple of (user, token).
        Falls back to parent implementation which handles token validation correctly.
        """
        # Use parent class implementation which handles token validation correctly
        return super().authenticate(request)
