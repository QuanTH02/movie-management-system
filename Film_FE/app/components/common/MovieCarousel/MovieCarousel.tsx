"use client";

import { useState, useCallback } from "react";
import MovieCard from "../MovieCard";
import SectionTitle from "@/app/components/detail/SectionTitle";
import type { Movie } from "@/types/api.types";

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
  onAddToList?: (movieName: string) => void;
}

function MovieCarousel({ movies, title, onAddToList }: MovieCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 6;
  const totalSlides = Math.ceil(movies.length / itemsPerSlide);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  }, [totalSlides]);

  if (movies.length === 0) return null;

  const currentMovies = movies.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide,
  );

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>{title}</SectionTitle>
        {totalSlides > 1 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-card bg-dark-card hover:bg-dark-card-hover text-dark-text transition-colors duration-hover"
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-card bg-dark-card hover:bg-dark-card-hover text-dark-text transition-colors duration-hover"
              aria-label="Next"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {currentMovies.map((movie) => (
          <MovieCard
            key={movie.movie_id}
            movie={movie}
            onAddToList={onAddToList}
          />
        ))}
      </div>

      {/* Slide Indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-hover ${
                index === currentSlide
                  ? "w-8 bg-primary-600"
                  : "w-2 bg-dark-border hover:bg-dark-card-hover"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieCarousel;
export type { MovieCarouselProps };
