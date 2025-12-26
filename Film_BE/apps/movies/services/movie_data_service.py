"""
Service for movie data processing and transformation.
"""

from typing import List, Optional

from apps.movies.models import Movieinformation, TicketRoom


class MovieDataService:
    """Service for processing and transforming movie data."""

    @staticmethod
    def convert_vote_to_number(vote_str: Optional[str]) -> Optional[int]:
        """
        Convert vote string to number (handles K, M, B suffixes).

        Args:
            vote_str: Vote string (e.g., "1.5K", "2M", "1B")

        Returns:
            Integer value or None
        """
        if not vote_str or not isinstance(vote_str, str):
            return None

        suffixes = {"K": 1e3, "M": 1e6, "B": 1e9}

        if vote_str[-1] in suffixes:
            return int(float(vote_str[:-1]) * suffixes[vote_str[-1]])
        else:
            try:
                return int(vote_str)
            except ValueError:
                return None

    @staticmethod
    def extract_rating(rating_str: Optional[str]) -> Optional[str]:
        """
        Extract rating value from string (e.g., "8.5/10" -> "8.5").

        Args:
            rating_str: Rating string

        Returns:
            Rating value or None
        """
        if not rating_str or "/" not in rating_str:
            return None

        parts = rating_str.split("/")
        return parts[0].strip() if parts else None

    @staticmethod
    def convert_gross_to_number(gross_str: Optional[str]) -> Optional[int]:
        """
        Convert gross string to number (removes $ and commas).

        Args:
            gross_str: Gross string (e.g., "$1,234,567")

        Returns:
            Integer value or None
        """
        if not gross_str or "$" not in gross_str:
            return None

        # Remove $ and commas
        cleaned_str = gross_str.replace("$", "").replace(",", "")
        try:
            return int(cleaned_str)
        except ValueError:
            return None

    @staticmethod
    def process_movie_votes_and_rating(movie: Movieinformation) -> Movieinformation:
        """
        Process movie votes and rating fields.

        Args:
            movie: Movieinformation object

        Returns:
            Movieinformation object with processed fields
        """
        if movie.total_vote:
            movie.total_vote = MovieDataService.convert_vote_to_number(movie.total_vote)

        if movie.rating:
            movie.rating = MovieDataService.extract_rating(movie.rating)

        return movie

    @staticmethod
    def process_ticket_room_gross(ticket_room: TicketRoom) -> TicketRoom:
        """
        Process ticket room gross worldwide field.

        Args:
            ticket_room: TicketRoom object

        Returns:
            TicketRoom object with processed gross_worldwide
        """
        if ticket_room.gross_worldwide:
            ticket_room.gross_worldwide = MovieDataService.convert_gross_to_number(ticket_room.gross_worldwide)
        return ticket_room

    @staticmethod
    def get_top_grossing_movies(limit: int = 12) -> List[Movieinformation]:
        """
        Get top grossing movies by worldwide gross.

        Args:
            limit: Number of movies to return

        Returns:
            List of Movieinformation objects sorted by gross worldwide
        """
        ticket_rooms = TicketRoom.objects.all()
        # Filter and sort by gross_worldwide
        ticket_rooms_with_gross = []
        for ticket_room in ticket_rooms:
            gross_value = MovieDataService.convert_gross_to_number(ticket_room.gross_worldwide)
            if gross_value is not None:
                ticket_rooms_with_gross.append((ticket_room, gross_value))

        # Sort by gross value descending
        ticket_rooms_with_gross.sort(key=lambda x: x[1], reverse=True)

        # Get top movies (with error handling for None movie)
        top_ticket_rooms = ticket_rooms_with_gross[:limit]
        movie_ids = [tr[0].movie.movie_id for tr in top_ticket_rooms if tr[0].movie and tr[0].movie.movie_id]

        # Return movies in order
        if not movie_ids:
            return []
        movies = Movieinformation.objects.filter(movie_id__in=movie_ids)
        movie_dict = {movie.movie_id: movie for movie in movies}
        return [movie_dict[mid] for mid in movie_ids if mid in movie_dict]
