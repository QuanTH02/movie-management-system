"use client";

import { useState, useCallback, useEffect } from "react";
import MovieCard from "../MovieCard";
import type { Movie } from "@/types/api.types";

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
  onAddToList?: (movieName: string) => void;
}

function MovieCarousel({ movies, title, onAddToList }: MovieCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const first6 = movies.slice(0, 6);
  const next6 = movies.slice(6, 12);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  }, []);

  if (movies.length === 0) {
    return null;
  }

  return (
    <div>
      <a href="#" style={{ color: "black" }}>
        <h3 className="topic mb-0 mt-4">
          | {title} <i className="fas fa-chevron-right"></i>
        </h3>
      </a>
      <div
        id={`carousel${title.replace(/\s+/g, "")}`}
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className={`carousel-item ${currentSlide === 0 ? "active" : ""}`}
          >
            <div className="row mt-4" id={`list${title.replace(/\s+/g, "")}`}>
              {first6.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie={movie}
                  onAddToList={onAddToList}
                />
              ))}
            </div>
          </div>
          {next6.length > 0 && (
            <div
              className={`carousel-item ${currentSlide === 1 ? "active" : ""}`}
            >
              <div
                className="row mt-4"
                id={`list${title.replace(/\s+/g, "")}-Carousel`}
              >
                {next6.map((movie) => (
                  <MovieCard
                    key={movie.movie_id}
                    movie={movie}
                    onAddToList={onAddToList}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {movies.length > 6 && (
          <>
            <a
              className="carousel-control-prev"
              href={`#carousel${title.replace(/\s+/g, "")}`}
              role="button"
              data-slide="prev"
              style={{ width: "30px" }}
              onClick={(e) => {
                e.preventDefault();
                handlePrev();
              }}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href={`#carousel${title.replace(/\s+/g, "")}`}
              role="button"
              data-slide="next"
              style={{ width: "30px" }}
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCarousel;
export type { MovieCarouselProps };
