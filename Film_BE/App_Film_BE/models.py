# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import User

class AspectRatio(models.Model):
    aspect_ratio_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    aspect_ratio_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aspect_ratio'


class Awards(models.Model):
    awards_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    awards_name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'awards'


class Camera(models.Model):
    camera_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    camera_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'camera'


class Cast(models.Model):
    cast_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cast'


class CinematographicProcess(models.Model):
    cinematographic_process_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    cinematographic_process_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cinematographic_process'


class Cinematography(models.Model):
    cinematography_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cinematography'


class Color(models.Model):
    color_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    color_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'color'


class CountryOrigin(models.Model):
    country_origin_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    country_origin_name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'country_origin'


class DidYouKnow(models.Model):
    did_you_know_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    name = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'did_you_know'


class Director(models.Model):
    director_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'director'


class Editing(models.Model):
    editing_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'editing'


class FilmReview(models.Model):
    film_review_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    star_review = models.CharField(max_length=45, blank=True, null=True)
    title_review = models.TextField(blank=True, null=True)
    name_review = models.CharField(max_length=45, blank=True, null=True)
    date_review = models.CharField(max_length=45, blank=True, null=True)
    content_review = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'film_review'



class FilmingLocations(models.Model):
    filming_locations_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    filming_locations_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'filming_locations'


class Genres(models.Model):
    genres_id = models.IntegerField(primary_key=True)
    genres_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'genres'


class Laboratory(models.Model):
    laboratory_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    laboratory_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'laboratory'


class Language(models.Model):
    language_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    language_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'language'


class MovieCast(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    cast = models.ForeignKey(Cast, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_cast'


class MovieCinematography(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    cinematography = models.ForeignKey(Cinematography, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_cinematography'


class MovieDirector(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    director = models.ForeignKey(Director, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_director'


class MovieEditing(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    editing = models.ForeignKey(Editing, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_editing'


class MovieGenres(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    genres = models.ForeignKey(Genres, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_genres'


class MovieMusic(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    music = models.ForeignKey('Music', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_music'


class MovieProduced(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    produced = models.ForeignKey('Produced', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_produced'


class MovieSpecialeffects(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    special_effect = models.ForeignKey('Specialeffects', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_specialeffects'


class MovieTaglines(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING, blank=True, null=True)
    taglines = models.ForeignKey('Taglines', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movie_taglines'


class MovieWriters(models.Model):
    movie = models.ForeignKey('Movieinformation', models.DO_NOTHING)
    writers = models.ForeignKey('Writers', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'movie_writers'


class Movieinformation(models.Model):
    movie_id = models.IntegerField(primary_key=True)
    movie_name = models.CharField(max_length=200)
    original_name_movie = models.CharField(max_length=200, blank=True, null=True)
    year_manufacture = models.CharField(max_length=45, blank=True, null=True)
    release_date = models.CharField(max_length=45, blank=True, null=True)
    time = models.CharField(max_length=45, blank=True, null=True)
    link_img = models.TextField(blank=True, null=True)
    link_trailer = models.TextField(blank=True, null=True)
    describe_movie = models.TextField(blank=True, null=True)
    storyline = models.TextField(blank=True, null=True)
    rating = models.CharField(max_length=45, blank=True, null=True)
    total_vote = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movieinformation'


class Music(models.Model):
    music_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'music'


class NegativeFormat(models.Model):
    negative_format_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    negative_format_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'negative_format'


class OfficialSite(models.Model):
    official_site_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    official_site_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'official_site'


class PrintedFilmFormat(models.Model):
    printed_film_format_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    printed_film_format_name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'printed_film_format'


class Produced(models.Model):
    produced_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'produced'


class ProductionCompanies(models.Model):
    production_companies_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    production_companies_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'production_companies'


class RatingFilm(models.Model):
    rating_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    number_of_stars = models.CharField(max_length=45, blank=True, null=True)
    percent_people_vote = models.CharField(max_length=45, blank=True, null=True)
    number_people_vote = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rating'


class SoundMix(models.Model):
    sound_mix_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    sound_mix_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sound_mix'


class Specialeffects(models.Model):
    special_effect_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'specialeffects'


class Taglines(models.Model):
    taglines_id = models.IntegerField(primary_key=True)
    taglines_content = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'taglines'


class Testadd(models.Model):
    idtestadd = models.IntegerField(db_column='idtestAdd', primary_key=True)  # Field name made lowercase.
    new_column = models.CharField(max_length=45, blank=True, null=True)
    testadd = models.CharField(db_column='testAdd', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'testadd'


class TicketRoom(models.Model):
    ticket_room_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    budget = models.CharField(max_length=45, blank=True, null=True)
    gross = models.CharField(max_length=45, blank=True, null=True)
    opening_weekend = models.CharField(max_length=45, blank=True, null=True)
    gross_worldwide = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ticket_room'


class Writers(models.Model):
    writers_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=45, blank=True, null=True)
    role = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'writers'

# Thêm
class FollowFilmUser(models.Model):
    follow_id = models.AutoField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_view = models.IntegerField(default=0)

    class Meta:
        db_table = 'follow_film_user'
