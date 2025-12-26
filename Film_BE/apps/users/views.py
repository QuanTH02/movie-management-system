"""
Views for users app.
Handles authentication, account management, and like movie operations.
"""

from django.contrib.auth import login
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from apps.core.exceptions import BusinessLogicException, ResourceNotFoundException
from apps.movies.serializers import FilmSerializer
from apps.users.serializers import AccountSerializer, LoginSerializer, RegisterSerializer
from apps.users.services.account_service import AccountService
from apps.users.services.authentication_service import AuthenticationService
from apps.users.services.like_movie_service import LikeMovieService


class LoginView(APIView):
    """
    User login endpoint.

    POST:
    Request body:
    - username (required): User username
    - password (required): User password

    Returns:
    - 200 OK: Login successful with JWT tokens
    - 400 Bad Request: Invalid input
    - 401 Unauthorized: Login failed
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"message": "Invalid input.", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        try:
            user = AuthenticationService.authenticate_user(username, password)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            login(request, user)

            return Response(
                {
                    "message": "Successfully logged in.",
                    "access": access_token,
                    "refresh": refresh_token,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                },
                status=status.HTTP_200_OK,
            )
        except BusinessLogicException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class RegisterView(APIView):
    """
    User registration endpoint.

    POST:
    Request body:
    - account (required): Username
    - name (required): User's name
    - gmail (required): User's email
    - password (required): User's password
    - confirm_password (required): Password confirmation

    Returns:
    - 201 Created: User registered successfully with JWT tokens
    - 400 Bad Request: Validation error or account already exists
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"message": "Invalid input.", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            account = serializer.validated_data["account"]
            name = serializer.validated_data["name"]
            gmail = serializer.validated_data["gmail"]
            password = serializer.validated_data["password"]

            user = AuthenticationService.register_user(
                account=account,
                name=name,
                gmail=gmail,
                password=password,
            )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response(
                {
                    "message": "User successfully registered.",
                    "access": access_token,
                    "refresh": refresh_token,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        except BusinessLogicException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class TokenRefreshView(TokenRefreshView):
    """
    Token refresh endpoint.

    POST:
    Request body:
    - refresh (required): Refresh token

    Returns:
    - 200 OK: New access token
    - 401 Unauthorized: Invalid refresh token
    """

    permission_classes = [AllowAny]


class AccountView(APIView):
    """
    Account management endpoint.

    GET: Get account information
    Query parameters:
    - currentAccount (required): Username to get account info

    POST: Update account information
    Request body:
    - pfId (required): User ID
    - pfFName (optional): First name
    - pfLName (optional): Last name
    - pfEmail (optional): Email

    Returns:
    - 200 OK: Success with account data
    - 400 Bad Request: Validation error
    - 404 Not Found: User not found
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_account = request.query_params.get("currentAccount")
        if not current_account:
            # If no currentAccount provided, return current user's account
            serializer = AccountSerializer(request.user)
            return Response(
                {"message": "Successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )

        try:
            user = AccountService.get_user_by_username(current_account)
            serializer = AccountSerializer(user)
            return Response(
                {"message": "Successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request):
        user_id = request.data.get("pfId")
        if not user_id:
            # If no pfId provided, update current user
            user_id = request.user.id

        try:
            user = AccountService.update_user_profile(
                user_id=user_id,
                first_name=request.data.get("pfFName"),
                last_name=request.data.get("pfLName"),
                email=request.data.get("pfEmail"),
            )
            return Response(
                {"message": "Update Success"},
                status=status.HTTP_200_OK,
            )
        except ResourceNotFoundException as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_404_NOT_FOUND,
            )


class LikeMovieView(APIView):
    """
    Like movie management endpoint.

    GET: Get liked movies for a user
    Query parameters:
    - userName (optional): Username (defaults to current user)

    POST: Like a movie
    Request body:
    - movieName (required): Movie name

    DELETE: Unlike a movie
    Request body:
    - movieName (required): Movie name

    Returns:
    - 200 OK: Success with movie list
    - 201 Created: Movie liked successfully
    - 204 No Content: Movie unliked successfully
    - 400 Bad Request: Validation error or business logic error
    - 404 Not Found: User or movie not found
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_name = request.query_params.get("userName")
        if not user_name:
            # Default to current user
            user_name = request.user.username

        try:
            movies = LikeMovieService.get_liked_movies_by_username(user_name)
            serializer = FilmSerializer(movies, many=True)
            return Response(
                {"message": "Successfully", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request):
        movie_name = request.data.get("movieName")
        if not movie_name:
            return Response(
                {"message": "Movie name is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Use current user's username
        user_name = request.user.username

        try:
            LikeMovieService.like_movie(user_name, movie_name)
            return Response(
                {"message": "Like movie successfully."},
                status=status.HTTP_201_CREATED,
            )
        except (ResourceNotFoundException, BusinessLogicException) as e:
            status_code = (
                status.HTTP_404_NOT_FOUND if isinstance(e, ResourceNotFoundException) else status.HTTP_400_BAD_REQUEST
            )
            return Response(
                {"message": str(e)},
                status=status_code,
            )

    def delete(self, request):
        movie_name = request.data.get("movieName")
        if not movie_name:
            return Response(
                {"message": "Movie name is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Use current user's username
        user_name = request.user.username

        try:
            LikeMovieService.unlike_movie(user_name, movie_name)
            return Response(
                {"message": "Unlike movie successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except (ResourceNotFoundException, BusinessLogicException) as e:
            status_code = (
                status.HTTP_404_NOT_FOUND if isinstance(e, ResourceNotFoundException) else status.HTTP_400_BAD_REQUEST
            )
            return Response(
                {"message": str(e)},
                status=status_code,
            )
