from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password, check_password
from django.db.models import F
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from .models import (
    Movieinformation,
    Awards,
    MovieDirector,
    Director,
    Camera,
    Cast,
    MovieCast,
    Cinematography,
    MovieCinematography,
    Editing,
    MovieEditing,
    Genres,
    MovieGenres,
    Music,
    MovieMusic,
    Produced,
    MovieProduced,
    Specialeffects,
    MovieSpecialeffects,
    Taglines,
    MovieTaglines,
    Writers,
    MovieWriters,
    AspectRatio,
    CinematographicProcess,
    Color,
    CountryOrigin,
    DidYouKnow,
    FilmReview,
    FilmingLocations,
    Laboratory,
    Language,
    NegativeFormat,
    OfficialSite,
    PrintedFilmFormat,
    ProductionCompanies,
    RatingFilm,
    SoundMix,
    TicketRoom,
    FollowFilmUser,
)
from .serializers import (
    # User
    AccountSerializer,
    LoginSerializer,
    RegisterSerializer,
    ReviewSerializer,
    FilmSerializer,
    AwardsSerializer,
    DirectorSerializer,
    CameraSerializer,
    CastSerializer,
    CinematographySerializer,
    EditingSerializer,
    GenresSerializer,
    MusicSerializer,
    ProducedSerializer,
    SpecialeffectsSerializer,
    TaglinesSerializer,
    WritersSerializer,
    AspectRatiosSerializer,
    CinematographicProcessSerializer,
    ColorSerializer,
    CountryOriginSerializer,
    DidYouKnowSerializer,
    FilmReviewSerializer,
    FilmingLocationsSerializer,
    LaboratorySerializer,
    LanguageSerializer,
    NegativeFormatSerializer,
    OfficialSiteSerializer,
    PrintedFilmFormatSerializer,
    ProductionCompaniesSerializer,
    RatingFilmSerializer,
    SoundMixSerializer,
    TicketRoomSerializer,
    FollowFilmUserSerializer
)


# User
class LoginView(generics.ListAPIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return Response(
                    {"message": "Successfully logged in."}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"message": "Login failed"}, status=status.HTTP_401_UNAUTHORIZED
                )
        else:
            return Response(
                {"message": "Invalid input."}, status=status.HTTP_400_BAD_REQUEST
            )


class RegisterView(generics.ListAPIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            account = serializer.validated_data["account"]
            name = serializer.validated_data["name"]
            gmail = serializer.validated_data["gmail"]
            password = serializer.validated_data["password"]

            # Check if the account already exists
            if User.objects.filter(username=account).exists():
                return Response(
                    {"message": "Account already exists."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if the password has at least 6 characters
            if len(password) < 6:
                return Response(
                    {"message": "Password must be at least 6 characters."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Create a new user
            user = User.objects.create_user(
                username=account, email=gmail, password=password
            )
            user.last_name = name
            user.save()


            # Thêm vào Follow
            user_id = User.objects.get(username=account).id
            movies = Movieinformation.objects.all()

            for movie in movies:
                FollowFilmUser.objects.create(user_id=user_id, movie_id=movie.movie_id, total_view=0)


            return Response(
                {"message": "User successfully registered."},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TicketListView(generics.ListAPIView):
    serializer_class = TicketRoomSerializer

    def get_queryset(self):
        # Lấy danh sách TicketRoom từ cơ sở dữ liệu
        queryset = TicketRoom.objects.all()

        # Cập nhật giá trị gross_worldwide của từng ticket_room
        for ticket_room in queryset:
            if ticket_room.gross_worldwide:
                ticket_room.gross_worldwide = self.convert_gross_to_number(ticket_room.gross_worldwide)

        return queryset

    def convert_gross_to_number(self, gross_str):
        if gross_str and '$' in gross_str:
            # Loại bỏ ký tự "$" và dấu phẩy từ chuỗi
            cleaned_str = gross_str.replace('$', '').replace(',', '')
            return int(cleaned_str)
        else:
            return None

class ReviewView(generics.CreateAPIView):
    serializer_class = FilmReviewSerializer

    def create(self, request, *args, **kwargs):
        movie_name = request.data.get("movie")
        
        if not movie_name:
            return Response(
                {"message": "movie_name is required."}, status=status.HTTP_400_BAD_REQUEST
            )
        movie_info = Movieinformation.objects.filter(movie_name=movie_name).first()
        movie_id = movie_info.movie_id

        # Lấy các giá trị khác từ request.data
        star_review = request.data.get("star_review")
        title_review = request.data.get("title_review")
        content_review = request.data.get("content_review")
        name_review = request.data.get("name_review")

        # Lấy thời gian hiện tại
        date_review = timezone.now()
        
        # Truy vấn để lấy movie_id từ Movieinformation
        total_reviews = FilmReview.objects.count()
        film_review_id = total_reviews + 1

        # Lưu vào bảng FilmReview
        film_review = FilmReview.objects.create(
            film_review_id=film_review_id,
            movie_id=movie_id,
            star_review=star_review,
            title_review=title_review,
            name_review=name_review,
            date_review=date_review,
            content_review=content_review,
        )


        return Response(
            {"message": "Review created successfully."},
            status=status.HTTP_201_CREATED,
        )



class FilmListView(generics.ListAPIView):
    serializer_class = FilmSerializer

    def get_queryset(self):
        queryset = Movieinformation.objects.all()
        # members = User.objects.all()

        # for member in members:
        #     for film in queryset:
        #         FollowFilmUser.objects.create(user_id=member.id, movie_id=film.movie_id, total_view=0)

        for movie_info in queryset:
            if movie_info.total_vote:
                movie_info.total_vote = self.convert_vote_to_number(movie_info.total_vote)

            if movie_info.rating:
                movie_info.rating = self.extract_rating(movie_info.rating)

        return queryset
    
    def convert_vote_to_number(self, vote_str):
        if vote_str and isinstance(vote_str, str):
            suffixes = {"K": 1e3, "M": 1e6, "B": 1e9}
            
            if vote_str[-1] in suffixes:
                return int(float(vote_str[:-1]) * suffixes[vote_str[-1]])
            else:
                return int(vote_str)
        else:
            return None

    def extract_rating(self, rating_str):
        if rating_str and '/' in rating_str:
            parts = rating_str.split('/')
            return parts[0]
        else:
            return None




class AwardsListView(generics.ListAPIView):
    serializer_class = AwardsSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return Awards.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_awards_by_movie_name(movie_id)

    def get_awards_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            awards = Awards.objects.filter(movie__movie_id=movie_info.movie_id)
            return awards
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class DirectorListView(generics.ListAPIView):
    serializer_class = DirectorSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_identifier)
            return self.get_directors_by_movie_id(movie_id)
        except ValueError:
            return self.get_directors_by_movie_name(movie_identifier)

    def get_directors_by_movie_id(self, movie_id):
        movie_directors = MovieDirector.objects.filter(movie_id=movie_id)
        director_ids = movie_directors.values_list("director_id", flat=True)
        directors = Director.objects.filter(director_id__in=director_ids)
        return directors

    def get_directors_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_directors = MovieDirector.objects.filter(movie_id=movie_info.movie_id)
            director_ids = movie_directors.values_list("director_id", flat=True)
            directors = Director.objects.filter(director_id__in=director_ids)
            return directors
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class CameraListView(generics.ListAPIView):
    serializer_class = CameraSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_cameras_by_movie_id(movie_id)
        except ValueError:
            return self.get_cameras_by_movie_name(movie_identifier)

    def get_cameras_by_movie_id(self, movie_id):
        return Camera.objects.filter(movie__movie_id=movie_id)

    def get_cameras_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            return Camera.objects.filter(movie__movie_id=movie_info.movie_id)
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class CastListView(generics.ListAPIView):
    serializer_class = CastSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_casts_by_movie_id(movie_id)
        except ValueError:
            return self.get_casts_by_movie_name(movie_identifier)

    def get_casts_by_movie_id(self, movie_id):
        movie_casts = MovieCast.objects.filter(movie_id=movie_id)
        cast_ids = movie_casts.values_list("cast_id", flat=True)
        return Cast.objects.filter(cast_id__in=cast_ids)

    def get_casts_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_casts = MovieCast.objects.filter(movie_id=movie_info.movie_id)
            cast_ids = movie_casts.values_list("cast_id", flat=True)
            return Cast.objects.filter(cast_id__in=cast_ids)
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class CinematographyListView(generics.ListAPIView):
    serializer_class = CinematographySerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_cinematographys_by_movie_id(movie_id)
        except ValueError:
            return self.get_cinematographys_by_movie_name(movie_identifier)

    def get_cinematographys_by_movie_id(self, movie_id):
        movie_cinematography = MovieCinematography.objects.filter(movie_id=movie_id)
        cinematography_ids = movie_cinematography.values_list(
            "cinematography_id", flat=True
        )
        return Cinematography.objects.filter(
            cinematography_id__in=cinematography_ids
        )

    def get_cinematographys_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_cinematography = MovieCinematography.objects.filter(
                movie_id=movie_info.movie_id
            )
            cinematography_ids = movie_cinematography.values_list(
                "cinematography_id", flat=True
            )
            return Cinematography.objects.filter(
                cinematography_id__in=cinematography_ids
            )
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class EditingListView(generics.ListAPIView):
    serializer_class = EditingSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_editings_by_movie_id(movie_id)
        except ValueError:
            return self.get_editings_by_movie_name(movie_identifier)

    def get_editings_by_movie_id(self, movie_id):
        movie_editing = MovieEditing.objects.filter(movie_id=movie_id)
        editing_ids = movie_editing.values_list("editing_id", flat=True)
        return Editing.objects.filter(editing_id__in=editing_ids)

    def get_editings_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_editing = MovieEditing.objects.filter(movie_id=movie_info.movie_id)
            editing_ids = movie_editing.values_list("editing_id", flat=True)
            return Editing.objects.filter(editing_id__in=editing_ids)
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class GenresListView(generics.ListAPIView):
    serializer_class = GenresSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_genres_by_movie_id(movie_id)
        except ValueError:
            return self.get_genres_by_movie_name(movie_identifier)

    def get_genres_by_movie_id(self, movie_id):
        movie_genres = MovieGenres.objects.filter(movie_id=movie_id)
        genres_ids = movie_genres.values_list("genres_id", flat=True)
        return Genres.objects.filter(genres_id__in=genres_ids)

    def get_genres_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_genres = MovieGenres.objects.filter(movie_id=movie_info.movie_id)
            genres_ids = movie_genres.values_list("genres_id", flat=True)
            return Genres.objects.filter(genres_id__in=genres_ids)
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class MusicListView(generics.ListAPIView):
    serializer_class = MusicSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_music_by_movie_id(movie_id)
        except ValueError:
            return self.get_music_by_movie_name(movie_identifier)

    def get_music_by_movie_id(self, movie_id):
        movie_music = MovieMusic.objects.filter(movie_id=movie_id)
        music_ids = movie_music.values_list("music_id", flat=True)
        return Music.objects.filter(music_id__in=music_ids)

    def get_music_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_music = MovieMusic.objects.filter(movie_id=movie_info.movie_id)
            music_ids = movie_music.values_list("music_id", flat=True)
            return Music.objects.filter(music_id__in=music_ids)
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class ProducedListView(generics.ListAPIView):
    serializer_class = ProducedSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_produced_by_movie_id(movie_id)
        except ValueError:
            return self.get_produced_by_movie_name(movie_identifier)

    def get_produced_by_movie_id(self, movie_id):
        movie_produced = MovieProduced.objects.filter(movie_id=movie_id)
        produced_ids = movie_produced.values_list("produced_id", flat=True)
        return Produced.objects.filter(produced_id__in=produced_ids)

    def get_produced_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_produced = MovieProduced.objects.filter(movie_id=movie_info.movie_id)
            produced_ids = movie_produced.values_list("produced_id", flat=True)
            return Produced.objects.filter(produced_id__in=produced_ids)
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class SpecialeffectsListView(generics.ListAPIView):
    serializer_class = SpecialeffectsSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_specialeffects_by_movie_id(movie_id)
        except ValueError:
            return self.get_specialeffects_by_movie_name(movie_identifier)

    def get_specialeffects_by_movie_id(self, movie_id):
        movie_specialeffects = MovieSpecialeffects.objects.filter(movie_id=movie_id)
        specialeffects_ids = movie_specialeffects.values_list(
            "special_effect_id", flat=True
        )
        return Specialeffects.objects.filter(special_effect_id__in=specialeffects_ids)

    def get_specialeffects_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_specialeffects = MovieSpecialeffects.objects.filter(
                movie_id=movie_info.movie_id
            )
            specialeffects_ids = movie_specialeffects.values_list(
                "special_effect_id", flat=True
            )
            return Specialeffects.objects.filter(
                special_effect_id__in=specialeffects_ids
            )
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(
            {"message": "Successfully", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


class TaglinesListView(generics.ListAPIView):
    serializer_class = TaglinesSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_taglines_by_movie_id(movie_id)
        except ValueError:
            return self.get_taglines_by_movie_name(movie_identifier)

    def get_taglines_by_movie_id(self, movie_id):
        movie_taglines = MovieTaglines.objects.filter(movie_id=movie_id)
        taglines_ids = movie_taglines.values_list("taglines_id", flat=True)
        return Taglines.objects.filter(taglines_id__in=taglines_ids)

    def get_taglines_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_taglines = MovieTaglines.objects.filter(movie_id=movie_info.movie_id)
            taglines_ids = movie_taglines.values_list("taglines_id", flat=True)
            return Taglines.objects.filter(taglines_id__in=taglines_ids)
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(
            {"message": "Successfully", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


class WritersListView(generics.ListAPIView):
    serializer_class = WritersSerializer

    def get_queryset(self):
        movie_identifier = self.kwargs["movie_id"]

        try:
            movie_id = int(movie_identifier)
            return self.get_writers_by_movie_id(movie_id)
        except ValueError:
            return self.get_writers_by_movie_name(movie_identifier)

    def get_writers_by_movie_id(self, movie_id):
        movie_writers = MovieWriters.objects.filter(movie_id=movie_id)
        writers_ids = movie_writers.values_list("writers_id", flat=True)
        return Writers.objects.filter(writers_id__in=writers_ids)

    def get_writers_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            movie_writers = MovieWriters.objects.filter(movie_id=movie_info.movie_id)
            writers_ids = movie_writers.values_list("writers_id", flat=True)
            return Writers.objects.filter(writers_id__in=writers_ids)
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(
            {"message": "Successfully", "data": serializer.data},
            status=status.HTTP_200_OK,
        )

class MovieListView(generics.ListAPIView):
    serializer_class = FilmSerializer

    def get_queryset(self, current_account):
        movie_id = self.kwargs["movie_id"]
        if movie_id.isdigit():
            movie_id = int(movie_id)
            return Movieinformation.objects.filter(movie_id=movie_id)
        else:
            return self.get_movie_by_movie_name(movie_id, current_account)

    def get_movie_by_movie_name(self, movie_name, current_account):
        try:
            if current_account:
                user = User.objects.get(username=current_account)
                user_id = user.id
            movie = Movieinformation.objects.filter(movie_name=movie_name)

            movie_id = movie.first().movie_id
            print("User_id: ", user_id)
            print("Movie_id: ", movie_id)

            try:
                follow_instance = FollowFilmUser.objects.get(user_id=user_id, movie_id=movie_id)
                follow_instance.total_view = F('total_view') + 1
                follow_instance.save()
            except FollowFilmUser.DoesNotExist:
                FollowFilmUser.objects.create(user_id=user_id, movie_id=movie_id, total_view=1)

            return movie
        except User.DoesNotExist:
            raise generics.NotFound("User not found.")
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def post(self, request, *args, **kwargs):
        current_account = request.data.get('currentAccount')
        

            # for member in members:
            #     for film in queryset:
            #         FollowFilmUser.objects.create(user_id=member.id, movie_id=film.movie_id, total_view=0)
        queryset = self.get_queryset(current_account)
        serializer = self.serializer_class(queryset, many=True)
        response_data = {
            "message": "Successfully",
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)

# Không bảng trung gian
class AspectRatioListView(generics.ListAPIView):
    serializer_class = AspectRatiosSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        try:
            movie_id = int(movie_id)
            return AspectRatio.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_aspect_ratios_by_movie_name(movie_id)

    def get_aspect_ratios_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            aspect_ratios = AspectRatio.objects.filter(movie__movie_id=movie_info.movie_id)
            return aspect_ratios
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class CinematographicProcessListView(generics.ListAPIView):
    serializer_class = CinematographicProcessSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return CinematographicProcess.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_cinematographic_processes_by_movie_name(movie_id)

    def get_cinematographic_processes_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            cinematographic_processes = CinematographicProcess.objects.filter(movie__movie_id=movie_info.movie_id)
            return cinematographic_processes
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class ColorProcessListView(generics.ListAPIView):
    serializer_class = ColorSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return Color.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_colors_by_movie_name(movie_id)

    def get_colors_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            colors = Color.objects.filter(movie__movie_id=movie_info.movie_id)
            return colors
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class CountryOriginListView(generics.ListAPIView):
    serializer_class = CountryOriginSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return CountryOrigin.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_country_origins_by_movie_name(movie_id)

    def get_country_origins_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            country_origins = CountryOrigin.objects.filter(movie__movie_id=movie_info.movie_id)
            return country_origins
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class DidYouKnowListView(generics.ListAPIView):
    serializer_class = DidYouKnowSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return DidYouKnow.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_did_you_knows_by_movie_name(movie_id)

    def get_did_you_knows_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            did_you_knows = DidYouKnow.objects.filter(movie__movie_id=movie_info.movie_id)
            return did_you_knows
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class FilmReviewListView(generics.ListAPIView):
    serializer_class = FilmReviewSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return FilmReview.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_reviews_by_movie_name(movie_id)

    def get_reviews_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            film_reviews = FilmReview.objects.filter(movie__movie_id=movie_info.movie_id)
            return film_reviews
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)
        


class FilmingLocationsListView(generics.ListAPIView):
    serializer_class = FilmingLocationsSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return FilmingLocations.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_locations_by_movie_name(movie_id)

    def get_locations_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            filming_locations = FilmingLocations.objects.filter(movie__movie_id=movie_info.movie_id)
            return filming_locations
        except Movieinformation.DoesNotExist:
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class LaboratoryListView(generics.ListAPIView):
    serializer_class = LaboratorySerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return Laboratory.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_laboratories_by_movie_name(movie_id)

    def get_laboratories_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            laboratories = Laboratory.objects.filter(movie__movie_id=movie_info.movie_id)
            return laboratories
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class LanguageListView(generics.ListAPIView):
    serializer_class = LanguageSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return Language.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_languages_by_movie_name(movie_id)

    def get_languages_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            languages = Language.objects.filter(movie__movie_id=movie_info.movie_id)
            return languages
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class NegativeFormatListView(generics.ListAPIView):
    serializer_class = NegativeFormatSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return NegativeFormat.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_negative_formats_by_movie_name(movie_id)

    def get_negative_formats_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            negative_formats = NegativeFormat.objects.filter(movie__movie_id=movie_info.movie_id)
            return negative_formats
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class OfficialSiteListView(generics.ListAPIView):
    serializer_class = OfficialSiteSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return OfficialSite.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_official_sites_by_movie_name(movie_id)

    def get_official_sites_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            official_sites = OfficialSite.objects.filter(movie__movie_id=movie_info.movie_id)
            return official_sites
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class PrintedFilmFormatListView(generics.ListAPIView):
    serializer_class = PrintedFilmFormatSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return PrintedFilmFormat.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_printed_film_formats_by_movie_name(movie_id)

    def get_printed_film_formats_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            printed_film_formats = PrintedFilmFormat.objects.filter(movie__movie_id=movie_info.movie_id)
            return printed_film_formats
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class ProductionCompaniesListView(generics.ListAPIView):
    serializer_class = ProductionCompaniesSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return ProductionCompanies.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_production_companies_by_movie_name(movie_id)

    def get_production_companies_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            production_companies = ProductionCompanies.objects.filter(movie__movie_id=movie_info.movie_id)
            return production_companies
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)


class RatingFilmListView(generics.ListAPIView):
    serializer_class = RatingFilmSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return RatingFilm.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_rating_films_by_movie_name(movie_id)

    def get_rating_films_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            rating_films = RatingFilm.objects.filter(movie__movie_id=movie_info.movie_id)
            return rating_films
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class SoundMixListView(generics.ListAPIView):
    serializer_class = SoundMixSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return SoundMix.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_sound_mixes_by_movie_name(movie_id)

    def get_sound_mixes_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            sound_mixes = SoundMix.objects.filter(movie__movie_id=movie_info.movie_id)
            return sound_mixes
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class TicketRoomListView(generics.ListAPIView):
    serializer_class = TicketRoomSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        
        try:
            movie_id = int(movie_id)
            return TicketRoom.objects.filter(movie__movie_id=movie_id)
        except ValueError:
            return self.get_ticket_rooms_by_movie_name(movie_id)

    def get_ticket_rooms_by_movie_name(self, movie_name):
        try:
            movie_info = Movieinformation.objects.get(movie_name=movie_name)
            ticket_rooms = TicketRoom.objects.filter(movie__movie_id=movie_info.movie_id)
            
            # Cập nhật giá trị gross_worldwide của từng ticket_room
            for ticket_room in ticket_rooms:
                if ticket_room.gross_worldwide:
                    ticket_room.gross_worldwide = self.convert_gross_to_number(ticket_room.gross_worldwide)

            return ticket_rooms
        except Movieinformation.DoesNotExist:
            # Xử lý trường hợp không tìm thấy movie_name trong Movieinformation
            raise generics.NotFound("Movie not found.")

    def convert_gross_to_number(self, gross_str):
        if gross_str and '$' in gross_str:
            # Loại bỏ ký tự "$" và dấu phẩy từ chuỗi
            cleaned_str = gross_str.replace('$', '').replace(',', '')
            return int(cleaned_str)
        else:
            return None

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "message": "Successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)



# Create your views here.

class AccountListView(generics.ListAPIView):
    serializer_class = AccountSerializer

    def get_queryset(self):
        accounts = User.objects.all()
        return accounts

    def post(self, request, *args, **kwargs):
        current_account = request.data.get('currentAccount')
        if current_account:
            # Tìm người dùng dựa trên tên tài khoản
            try:
                user = User.objects.get(username=current_account)
                serialized_user = self.serializer_class(user)  # Không sử dụng many=True

                return Response({'data': serialized_user.data})  # Trả về serialized data
            except User.DoesNotExist:
                return Response({'message': 'User not found'}, status=404)
        else:
            pfFName = request.data.get('pfFName')
            pfLName = request.data.get('pfLName')
            pfEmail = request.data.get('pfEmail')
            user_id = request.data.get('pfId')

            print(pfFName)
            print(pfLName)
            print(pfEmail)
            print(user_id)

            user = User.objects.get(id=user_id)
            user.first_name = pfFName
            user.last_name = pfLName
            user.email = pfEmail
            user.save()    

            print(user)

            return Response({'message': 'Update Success'})