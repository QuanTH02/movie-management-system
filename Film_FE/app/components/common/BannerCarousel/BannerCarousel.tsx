"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Card from "../Card";
import type { Movie } from "@/types/api.types";

interface BannerCarouselProps {
  movies: Movie[];
}

function BannerCarousel({ movies }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerMovies = movies.slice(0, 3);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : bannerMovies.length - 1));
  }, [bannerMovies.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < bannerMovies.length - 1 ? prev + 1 : 0));
  }, [bannerMovies.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < bannerMovies.length - 1 ? prev + 1 : 0,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerMovies.length]);

  if (bannerMovies.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      {/* Main Banner */}
      <div className="lg:col-span-2 relative">
        <div className="relative w-full aspect-video rounded-card overflow-hidden bg-dark-surface">
          {bannerMovies.map((movie, index) => (
            <div
              key={movie.movie_id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {movie.main_trailer && (
                <video
                  controls
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                >
                  <source src={movie.main_trailer as string} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        {bannerMovies.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark-bg/80 hover:bg-dark-bg backdrop-blur-sm text-white p-3 rounded-full transition-all duration-hover z-10"
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark-bg/80 hover:bg-dark-bg backdrop-blur-sm text-white p-3 rounded-full transition-all duration-hover z-10"
              aria-label="Next"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </>
        )}

        {/* Indicators */}
        {bannerMovies.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {bannerMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-hover ${
                  index === currentIndex
                    ? "w-8 bg-primary-600"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sidebar - Next Trailers */}
      <div className="lg:col-span-1">
        <Card className="h-full p-6">
          <h3 className="text-xl font-bold text-dark-text mb-4">
            Next Trailers
          </h3>
          <div className="space-y-4">
            {bannerMovies.map((movie, index) => {
              const detailUrl = `/detail?movie=${encodeURIComponent(movie.movie_name)}`;
              return (
                <Link
                  key={movie.movie_id}
                  href={detailUrl}
                  className={`block w-full text-left p-3 rounded-card transition-all duration-hover ${
                    index === currentIndex
                      ? "bg-dark-card-hover border-2 border-primary-500"
                      : "bg-dark-surface hover:bg-dark-card-hover"
                  }`}
                >
                  <div className="flex gap-3">
                    {movie.main_img && (
                      <img
                        src={movie.main_img as string}
                        alt={movie.movie_name}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <i className="fa fa-play-circle text-primary-600" />
                        <span className="text-dark-text-secondary text-sm">
                          {movie.movie_time || "0:00"}
                        </span>
                      </div>
                      <h5 className="text-dark-text font-semibold mb-1 line-clamp-1">
                        {movie.movie_name}
                      </h5>
                      <p className="text-dark-text-secondary text-sm line-clamp-2">
                        {movie.describe_movie &&
                        String(movie.describe_movie).length > 60
                          ? `${String(movie.describe_movie).substring(0, 60)}...`
                          : String(movie.describe_movie || "")}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            href="/browse"
            className="block mt-4 text-right text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
          >
            Browse All →
          </Link>
        </Card>
      </div>
    </div>
  );
}

export default BannerCarousel;
export type { BannerCarouselProps };
