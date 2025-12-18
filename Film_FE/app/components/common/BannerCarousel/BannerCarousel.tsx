"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
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

  if (bannerMovies.length === 0) {
    return null;
  }

  return (
    <div className="row">
      <div className="col-md-8 banner-trailer-film">
        <div id="carouselBannerImg" className="carousel slide">
          <div
            className="carousel-inner video-trailer"
            id="all_video_home"
            data-ride="false"
          >
            {bannerMovies.map((movie, index) => (
              <div
                key={movie.movie_id}
                className={`carousel-item ${index === currentIndex ? "active" : ""} video-trailer`}
              >
                {movie.main_trailer && (
                  <video controls width="100%">
                    <source
                      src={movie.main_trailer as string}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselBannerImg"
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
            href="#carouselBannerImg"
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
        </div>
      </div>
      <div className="col-md-4 pr-0 list-trailer-play">
        <h3 style={{ marginTop: "-10px" }}>Next Trailer</h3>
        <ul className="list-group" id="listRightVideo">
          {bannerMovies.map((movie, index) => (
            <li
              key={movie.movie_id}
              className="list-group-item pt-0 pb-0 mb-1 trailer-play"
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.setItem("movie_name", movie.movie_name);
                  window.location.href = "/detail";
                }
              }}
            >
              <div className="row">
                <div className="col-md-2 img-small">
                  {movie.main_img && (
                    <img
                      src={movie.main_img as string}
                      className="card-img-top"
                      alt="Movie Image"
                    />
                  )}
                </div>
                <div className="col-md-10 card-body d-flex flex-column mt-0 pt-0">
                  <p className="play-time">
                    <i
                      className="fa fa-play-circle-o mr-2"
                      style={{ fontSize: "30px" }}
                    ></i>{" "}
                    {movie.movie_time || "0:00"}
                  </p>
                  <h5
                    className="card-title mt-0 mb-1"
                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {movie.movie_name}
                  </h5>
                  <p className="des">
                    {movie.describe_movie &&
                    String(movie.describe_movie).length > 60
                      ? `${String(movie.describe_movie).substring(0, 60)}...`
                      : String(movie.describe_movie || "")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <a href="#">
          <h2>Browse Trailer &gt;</h2>
        </a>
      </div>
    </div>
  );
}

export default BannerCarousel;
export type { BannerCarouselProps };
