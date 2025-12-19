"use client";

import Link from "next/link";
import { useI18n } from "@/app/lib/i18n";
import type { Movie } from "@/types/api.types";

interface MovieHeaderProps {
  movie: Movie;
  movieName: string | null;
}

function MovieHeader({ movie, movieName }: MovieHeaderProps) {
  const { t } = useI18n();
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-dark-text mb-3">
          {movie.movie_name}
        </h1>
        <div className="flex items-center gap-2 text-dark-text">
          {movie.year_manufacture && (
            <>
              <span>{String(movie.year_manufacture)}</span>
              <span className="text-dark-text-secondary">•</span>
            </>
          )}
          <span>{t.detail.ageRating}</span>
          <span className="text-dark-text-secondary">•</span>
          <span>
            {String((movie as any).time || movie.movie_time || "2h 38m")}
          </span>
        </div>
      </div>
      <div className="text-right">
        <h6 className="text-dark-text text-xs uppercase mb-2">
          {t.detail.imdbRating}
        </h6>
        <Link
          href={`/rating?movie=${encodeURIComponent(movieName || "")}`}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-card bg-dark-card hover:bg-dark-card-hover transition-colors duration-hover"
        >
          <i className="fas fa-star text-rating-DEFAULT text-xl" />
          <div className="text-left">
            <p className="m-0 text-dark-text font-semibold text-base">
              {movie.rating || t.detail.notAvailable}
            </p>
            <p className="m-0 text-dark-text-secondary text-xs">
              {movie.total_vote || 0} {t.detail.votes}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MovieHeader;
export type { MovieHeaderProps };
