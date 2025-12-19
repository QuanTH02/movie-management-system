"use client";

import Link from "next/link";

interface Genre {
  genres_id?: number;
  genres_name: string;
}

interface Director {
  director_id?: number;
  director_name: string;
}

interface Writer {
  writers_id?: number;
  name: string;
}

interface Cast {
  cast_id?: number;
  name: string;
}

interface MovieIntroProps {
  genres?: Genre[];
  description?: string;
  directors?: Director[];
  writers?: Writer[];
  cast?: Cast[];
  reviewCount?: number;
  movieName: string | null;
}

function MovieIntro({
  genres,
  description,
  directors,
  writers,
  cast,
  reviewCount = 0,
  movieName,
}: MovieIntroProps) {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Genres */}
          {genres && genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((genre, index) => (
                <Link
                  key={genre.genres_id || index}
                  href={`/search?genre=${encodeURIComponent(genre.genres_name)}`}
                  className="px-3 py-1 rounded-badge border border-dark-border text-dark-text hover:bg-dark-card-hover hover:border-primary-500 transition-colors duration-hover text-sm"
                >
                  {genre.genres_name}
                </Link>
              ))}
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-dark-text-secondary text-lg leading-relaxed mb-4">
              {description}
            </p>
          )}

          <hr className="border-dark-border my-4" />

          {/* Directors, Writers, Stars */}
          <div className="space-y-3">
            {directors && directors.length > 0 && (
              <div>
                <span className="text-dark-text font-semibold mr-2">
                  Director:
                </span>
                {directors.map((director, index) => (
                  <span key={director.director_id || index}>
                    <Link
                      href={`/cast-and-crew?director=${encodeURIComponent(director.director_name)}`}
                      className="text-link-DEFAULT hover:text-link-hover transition-colors duration-hover"
                    >
                      {director.director_name}
                    </Link>
                    {index < directors.length - 1 && (
                      <span className="mx-2 text-dark-text-secondary">•</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {writers && writers.length > 0 && (
              <div>
                <span className="text-dark-text font-semibold mr-2">
                  Writer:
                </span>
                {writers.slice(0, 3).map((writer, index) => (
                  <span key={writer.writers_id || index}>
                    <Link
                      href="#"
                      className="text-link-DEFAULT hover:text-link-hover transition-colors duration-hover"
                    >
                      {writer.name}
                    </Link>
                    {index < Math.min(writers.length, 3) - 1 && (
                      <span className="mx-2 text-dark-text-secondary">•</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {cast && cast.length > 0 && (
              <div>
                <span className="text-dark-text font-semibold mr-2">
                  Stars:
                </span>
                {cast.slice(0, 3).map((star, index) => (
                  <span key={star.cast_id || index}>
                    <Link
                      href="#"
                      className="text-link-DEFAULT hover:text-link-hover transition-colors duration-hover"
                    >
                      {star.name}
                    </Link>
                    {index < Math.min(cast.length, 3) - 1 && (
                      <span className="mx-2 text-dark-text-secondary">•</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Review Count */}
        <div className="lg:col-span-1 flex items-center justify-center">
          <Link
            href={`/user-review?movie=${encodeURIComponent(movieName || "")}`}
            className="flex flex-col items-center gap-2 p-4 rounded-card bg-dark-card hover:bg-dark-card-hover transition-colors duration-hover"
          >
            <span className="text-3xl font-bold text-primary-600">
              {reviewCount}
            </span>
            <span className="text-dark-text-secondary">User reviews</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieIntro;
export type { MovieIntroProps };
