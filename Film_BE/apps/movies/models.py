"""
Models for movies app.
All models have managed = False as they map to existing database tables.
"""

from django.db import models


# Core movie model
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
    main_img = models.TextField(blank=True, null=True)
    main_trailer = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "movieinformation"
        verbose_name = "Movie"
        verbose_name_plural = "Movies"

    def __str__(self):
        return self.movie_name


# People and roles
class Genres(models.Model):
    genres_id = models.IntegerField(primary_key=True)
    genres_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "genres"
        verbose_name = "Genre"
        verbose_name_plural = "Genres"

    def __str__(self):
        return self.genres_name or ""


class Cast(models.Model):
    cast_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "cast"
        verbose_name = "Cast"
        verbose_name_plural = "Casts"

    def __str__(self):
        return self.name or ""


class Director(models.Model):
    director_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "director"
        verbose_name = "Director"
        verbose_name_plural = "Directors"

    def __str__(self):
        return self.name or ""


class Cinematography(models.Model):
    cinematography_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "cinematography"
        verbose_name = "Cinematography"
        verbose_name_plural = "Cinematographies"

    def __str__(self):
        return self.name or ""


class Editing(models.Model):
    editing_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "editing"
        verbose_name = "Editing"
        verbose_name_plural = "Editings"

    def __str__(self):
        return self.name or ""


class Music(models.Model):
    music_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "music"
        verbose_name = "Music"
        verbose_name_plural = "Musics"

    def __str__(self):
        return self.name or ""


class Produced(models.Model):
    produced_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "produced"
        verbose_name = "Produced"
        verbose_name_plural = "Produceds"

    def __str__(self):
        return self.name or ""


class Specialeffects(models.Model):
    special_effect_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    role = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "specialeffects"
        verbose_name = "Special Effect"
        verbose_name_plural = "Special Effects"

    def __str__(self):
        return self.name or ""


class Taglines(models.Model):
    taglines_id = models.IntegerField(primary_key=True)
    taglines_content = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "taglines"
        verbose_name = "Tagline"
        verbose_name_plural = "Taglines"

    def __str__(self):
        return self.taglines_content[:50] if self.taglines_content else ""


class Writers(models.Model):
    writers_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=45, blank=True, null=True)
    role = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "writers"
        verbose_name = "Writer"
        verbose_name_plural = "Writers"

    def __str__(self):
        return self.name or ""


# Junction tables
class MovieGenres(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    genres = models.ForeignKey(Genres, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_genres"


class MovieCast(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    cast = models.ForeignKey(Cast, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_cast"


class MovieDirector(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    director = models.ForeignKey(Director, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_director"


class MovieCinematography(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    cinematography = models.ForeignKey(Cinematography, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_cinematography"


class MovieEditing(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    editing = models.ForeignKey(Editing, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_editing"


class MovieMusic(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    music = models.ForeignKey(Music, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_music"


class MovieProduced(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    produced = models.ForeignKey(Produced, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_produced"


class MovieSpecialeffects(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    special_effect = models.ForeignKey(Specialeffects, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_specialeffects"


class MovieTaglines(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    taglines = models.ForeignKey(Taglines, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "movie_taglines"


class MovieWriters(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    writers = models.ForeignKey(Writers, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_writers"


# Movie metadata
class AspectRatio(models.Model):
    aspect_ratio_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    aspect_ratio_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "aspect_ratio"
        verbose_name = "Aspect Ratio"
        verbose_name_plural = "Aspect Ratios"

    def __str__(self):
        return self.aspect_ratio_name or ""


class Awards(models.Model):
    awards_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    awards_name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "awards"
        verbose_name = "Award"
        verbose_name_plural = "Awards"

    def __str__(self):
        return self.awards_name[:50] if self.awards_name else ""


class Camera(models.Model):
    camera_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    camera_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "camera"
        verbose_name = "Camera"
        verbose_name_plural = "Cameras"

    def __str__(self):
        return self.camera_name or ""


class CinematographicProcess(models.Model):
    cinematographic_process_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    cinematographic_process_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "cinematographic_process"
        verbose_name = "Cinematographic Process"
        verbose_name_plural = "Cinematographic Processes"

    def __str__(self):
        return self.cinematographic_process_name or ""


class Color(models.Model):
    color_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    color_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "color"
        verbose_name = "Color"
        verbose_name_plural = "Colors"

    def __str__(self):
        return self.color_name or ""


class CountryOrigin(models.Model):
    country_origin_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    country_origin_name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "country_origin"
        verbose_name = "Country Origin"
        verbose_name_plural = "Country Origins"

    def __str__(self):
        return self.country_origin_name or ""


class DidYouKnow(models.Model):
    did_you_know_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    name = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "did_you_know"
        verbose_name = "Did You Know"
        verbose_name_plural = "Did You Knows"

    def __str__(self):
        return self.name or ""


class FilmingLocations(models.Model):
    filming_locations_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    filming_locations_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "filming_locations"
        verbose_name = "Filming Location"
        verbose_name_plural = "Filming Locations"

    def __str__(self):
        return self.filming_locations_name or ""


class Laboratory(models.Model):
    laboratory_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    laboratory_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "laboratory"
        verbose_name = "Laboratory"
        verbose_name_plural = "Laboratories"

    def __str__(self):
        return self.laboratory_name or ""


class Language(models.Model):
    language_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    language_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "language"
        verbose_name = "Language"
        verbose_name_plural = "Languages"

    def __str__(self):
        return self.language_name or ""


class NegativeFormat(models.Model):
    negative_format_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    negative_format_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "negative_format"
        verbose_name = "Negative Format"
        verbose_name_plural = "Negative Formats"

    def __str__(self):
        return self.negative_format_name or ""


class OfficialSite(models.Model):
    official_site_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    official_site_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "official_site"
        verbose_name = "Official Site"
        verbose_name_plural = "Official Sites"

    def __str__(self):
        return self.official_site_name or ""


class PrintedFilmFormat(models.Model):
    printed_film_format_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    printed_film_format_name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "printed_film_format"
        verbose_name = "Printed Film Format"
        verbose_name_plural = "Printed Film Formats"

    def __str__(self):
        return self.printed_film_format_name[:50] if self.printed_film_format_name else ""


class ProductionCompanies(models.Model):
    production_companies_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    production_companies_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "production_companies"
        verbose_name = "Production Company"
        verbose_name_plural = "Production Companies"

    def __str__(self):
        return self.production_companies_name or ""


class SoundMix(models.Model):
    sound_mix_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    sound_mix_name = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "sound_mix"
        verbose_name = "Sound Mix"
        verbose_name_plural = "Sound Mixes"

    def __str__(self):
        return self.sound_mix_name or ""


class TicketRoom(models.Model):
    ticket_room_id = models.IntegerField(primary_key=True)
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    budget = models.CharField(max_length=45, blank=True, null=True)
    gross = models.CharField(max_length=45, blank=True, null=True)
    opening_weekend = models.CharField(max_length=45, blank=True, null=True)
    gross_worldwide = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "ticket_room"
        verbose_name = "Ticket Room"
        verbose_name_plural = "Ticket Rooms"

    def __str__(self):
        return f"Ticket Room for {self.movie.movie_name if self.movie else 'Unknown'}"


# Media
class LinkImg(models.Model):
    link_img_id = models.IntegerField(primary_key=True)
    link_img = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "link_img"
        verbose_name = "Link Image"
        verbose_name_plural = "Link Images"

    def __str__(self):
        return self.link_img or ""


class MovieImg(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING, blank=True, null=True)
    link_img = models.ForeignKey(LinkImg, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "movie_img"


class LinkTrailer(models.Model):
    link_trailler_id = models.IntegerField(primary_key=True)
    link_trailler = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = "link_trailler"
        verbose_name = "Link Trailer"
        verbose_name_plural = "Link Trailers"

    def __str__(self):
        return self.link_trailler or ""


class MovieTrailer(models.Model):
    movie = models.ForeignKey(Movieinformation, models.DO_NOTHING)
    link_trailler = models.ForeignKey(LinkTrailer, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "movie_trailler"
