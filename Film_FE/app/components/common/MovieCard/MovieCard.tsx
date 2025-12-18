"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Movie } from "@/types/api.types";

interface MovieCardProps {
  movie: Movie;
  onAddToList?: (movieName: string) => void;
}

function MovieCard({ movie, onAddToList }: MovieCardProps) {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
    }
  }, []);

  const handleCardClick = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("movie_name", movie.movie_name);
      window.location.href = "/detail";
    }
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToList) {
      onAddToList(movie.movie_name);
    }
  };

  const rating =
    movie.rating && String(movie.rating).includes("/")
      ? String(movie.rating).split("/")[0]
      : movie.movie_rating || movie.rating || "N/A";

  return (
    <div
      className="col-md-2 mb-4 mr-0 card-to-detail"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card">
        <div className="img-container">
          {movie.main_img ? (
            <img
              src={movie.main_img as string}
              alt={movie.movie_name}
              className="card-img-top"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          ) : (
            <div
              className="card-img-top bg-secondary"
              style={{ height: "300px" }}
            />
          )}
        </div>
        <div className="card-body d-flex flex-column align-items-center">
          <p className="card-text mr-auto mb-2">
            <i className="fas fa-star" style={{ color: "yellow" }}></i> {rating}
          </p>
          <h6 className="card-title mt-0">{movie.movie_name}</h6>
          <br />
          <button
            className="btn btn-primary add_to_list"
            onClick={handleAddToList}
          >
            <i className="fas fa-plus"></i> Add to List
          </button>
          <a
            href="/detail"
            className="mt-2"
            style={{ width: "150px", textAlign: "center" }}
            onClick={(e) => {
              e.preventDefault();
              handleCardClick();
            }}
          >
            <button className="btn btn-success p-2">
              <i className="fa fa-play mr-1"></i> Watch Movie
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
export type { MovieCardProps };
