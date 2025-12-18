"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "@/app/components/common/Navbar";
import BannerCarousel from "@/app/components/common/BannerCarousel";
import MovieCarousel from "@/app/components/common/MovieCarousel";
import MovieCard from "@/app/components/common/MovieCard";
import {
  useGetAllMovies,
  useGetRecommendCollaborative,
  useGetTopRevenue,
  useAddToList,
} from "@/app/lib/api/hooks";
import type { Movie } from "@/types/api.types";

function HomePage() {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const { data: movies, error, isLoading } = useGetAllMovies();
  const { data: recommendedMovies } =
    useGetRecommendCollaborative(currentAccount);
  const { data: topRevenueData } = useGetTopRevenue();
  const { trigger: addToListTrigger } = useAddToList({
    onSuccess: () => {
      if (typeof window !== "undefined") {
        alert("Movie has been added to your list!");
      }
    },
    onError: () => {
      if (typeof window !== "undefined") {
        alert("Failed to add to list!");
      }
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
    }
  }, []);

  const handleAddToList = useCallback(
    (movieName: string) => {
      if (!currentAccount) {
        alert("Please login to add movies to your list");
        return;
      }
      addToListTrigger({ userName: currentAccount, movieName });
    },
    [currentAccount, addToListTrigger],
  );

  const mostPopularMovies = useMemo(() => {
    if (!movies) return [];
    return [...movies]
      .sort((a, b) => (b.total_vote || 0) - (a.total_vote || 0))
      .slice(0, 12);
  }, [movies]);

  const mostFavouritesMovies = useMemo(() => {
    if (!movies) return [];
    return [...movies]
      .sort((a, b) => {
        const ratingA = a.rating
          ? String(a.rating).includes("/")
            ? parseFloat(String(a.rating).split("/")[0])
            : parseFloat(String(a.rating))
          : 0;
        const ratingB = b.rating
          ? String(b.rating).includes("/")
            ? parseFloat(String(b.rating).split("/")[0])
            : parseFloat(String(b.rating))
          : 0;
        return ratingB - ratingA;
      })
      .slice(0, 12);
  }, [movies]);

  const highestRevenueMovies = useMemo(() => {
    if (!topRevenueData?.data_top) return [];
    return topRevenueData.data_top.slice(0, 12);
  }, [topRevenueData]);

  if (isLoading) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="div-container mt-4" style={{ paddingTop: "56px" }}>
          <div className="text-center">Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="div-container mt-4" style={{ paddingTop: "56px" }}>
          <div className="text-center text-danger">
            <p>Error loading movies. Please try again later.</p>
            <p style={{ fontSize: "12px", color: "#666" }}>
              {error.message || "Unknown error"}
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div
          className="div-container mt-4"
          style={{
            paddingTop: "56px",
            minHeight: "100vh",
            backgroundColor: "#000",
            color: "#fff",
          }}
        >
          <div className="text-center" style={{ padding: "50px" }}>
            <h2 style={{ color: "#fff" }}>No movies available</h2>
            <p style={{ color: "#ccc" }}>Please check back later</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <div
        className="div-container mt-4"
        style={{
          paddingTop: "56px",
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        {movies && movies.length > 0 && <BannerCarousel movies={movies} />}

        <h1
          className="mt-0"
          style={{ color: "#fff", marginTop: "20px", marginBottom: "20px" }}
        >
          What to watch
        </h1>

        <div className="div-rcm">
          <div>
            <a href="#" style={{ color: "black" }}>
              <h3 className="topic mb-0 mt-4">
                | Recommend <i className="fas fa-chevron-right"></i>
              </h3>
            </a>
          </div>

          {!currentAccount && (
            <div
              id="no-login"
              className="p-3"
              style={{ textAlign: "center", display: "block", color: "#fff" }}
            >
              <a
                href="/login"
                style={{ color: "#4caf50", textDecoration: "none" }}
              >
                <h4 style={{ color: "#fff" }}>
                  To recommend movies, you need to log in
                </h4>
              </a>
            </div>
          )}

          {currentAccount &&
            recommendedMovies &&
            recommendedMovies.length > 0 && (
              <div
                id="div-recommend"
                className="carousel slide"
                data-ride="carousel"
                style={{ display: "block" }}
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row mt-4" id="listRecommend">
                      {recommendedMovies.slice(0, 6).map((movie, index) => (
                        <MovieCard
                          key={String(movie.movie_id || movie.id || index)}
                          movie={movie}
                          onAddToList={handleAddToList}
                        />
                      ))}
                    </div>
                  </div>
                  {recommendedMovies.length > 6 && (
                    <div className="carousel-item">
                      <div className="row mt-4" id="listRecommend-Carousel">
                        {recommendedMovies.slice(6, 12).map((movie, index) => (
                          <MovieCard
                            key={String(
                              movie.movie_id || movie.id || index + 6,
                            )}
                            movie={movie}
                            onAddToList={handleAddToList}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {recommendedMovies.length > 6 && (
                  <>
                    <a
                      className="carousel-control-prev"
                      href="#div-recommend"
                      role="button"
                      data-slide="prev"
                      style={{ width: "30px" }}
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#div-recommend"
                      role="button"
                      data-slide="next"
                      style={{ width: "30px" }}
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
            )}
        </div>

        {mostPopularMovies.length > 0 && (
          <MovieCarousel
            movies={mostPopularMovies}
            title="Most Popular"
            onAddToList={handleAddToList}
          />
        )}

        {mostFavouritesMovies.length > 0 && (
          <MovieCarousel
            movies={mostFavouritesMovies}
            title="Most Favourites"
            onAddToList={handleAddToList}
          />
        )}

        {highestRevenueMovies.length > 0 && (
          <MovieCarousel
            movies={highestRevenueMovies}
            title="Highest Revenue"
            onAddToList={handleAddToList}
          />
        )}
      </div>
    </>
  );
}

export default HomePage;
