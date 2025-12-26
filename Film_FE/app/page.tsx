"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "@/app/components/common/Navbar";
import BannerCarousel from "@/app/components/common/BannerCarousel";
import MovieCarousel from "@/app/components/common/MovieCarousel";
import Container from "@/app/components/common/Container";
import {
  useGetAllMovies,
  useGetRecommendCollaborative,
  useGetRecommendRealtime,
  useGetTopRevenue,
  useAddToList,
} from "@/app/lib/api/hooks";
import { useI18n } from "@/app/lib/i18n";
import { useToast } from "@/app/components/common/Toast";
import type { Movie } from "@/types/api.types";
import { MOVIE_LIST_DISPLAY_COUNT } from "@/app/lib/constants/ui";

function HomePage() {
  const { t } = useI18n();
  const toast = useToast();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const { data: movies, error, isLoading } = useGetAllMovies();
  const { data: recommendedMoviesCollaborative } =
    useGetRecommendCollaborative(currentAccount);
  const { data: recommendedMoviesRealtime } =
    useGetRecommendRealtime(currentAccount);
  const { data: topRevenueData } = useGetTopRevenue();
  const { trigger: addToListTrigger } = useAddToList({
    onSuccess: () => {
      toast.success(t.home.movieAddedToList);
    },
    onError: () => {
      toast.error(t.home.failedToAddToList);
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const account = localStorage.getItem("currentAccount");
      const token = sessionStorage.getItem("access_token");
      // Only set account if token exists (user is authenticated)
      if (token && account) {
        setCurrentAccount(account);
      } else {
        setCurrentAccount(null);
      }

      // Listen for storage changes (e.g., after login on another tab)
      const handleStorageChange = () => {
        const account = localStorage.getItem("currentAccount");
        const token = sessionStorage.getItem("access_token");
        // Only set account if token exists (user is authenticated)
        if (token && account) {
          setCurrentAccount(account);
        } else {
          setCurrentAccount(null);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      // Listen for custom event (same-tab updates)
      const handleCustomStorageChange = () => {
        const account = localStorage.getItem("currentAccount");
        const token = sessionStorage.getItem("access_token");
        // Only set account if token exists (user is authenticated)
        if (token && account) {
          setCurrentAccount(account);
        } else {
          setCurrentAccount(null);
        }
      };

      window.addEventListener("localStorageChange", handleCustomStorageChange);

      // Also check on focus (when user comes back to tab)
      const handleFocus = () => {
        const account = localStorage.getItem("currentAccount");
        const token = sessionStorage.getItem("access_token");
        // Only set account if token exists (user is authenticated)
        if (token && account) {
          setCurrentAccount(account);
        } else {
          setCurrentAccount(null);
        }
      };

      window.addEventListener("focus", handleFocus);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(
          "localStorageChange",
          handleCustomStorageChange,
        );
        window.removeEventListener("focus", handleFocus);
      };
    }
  }, []);

  const handleAddToList = useCallback(
    (movieName: string) => {
      if (!currentAccount) {
        toast.warning(t.home.pleaseLoginToAdd);
        return;
      }
      addToListTrigger({ userName: currentAccount, movieName });
    },
    [currentAccount, addToListTrigger, toast, t],
  );

  const mostPopularMovies = useMemo(() => {
    if (!movies) return [];
    return [...movies]
      .sort((a, b) => (b.total_vote || 0) - (a.total_vote || 0))
      .slice(0, MOVIE_LIST_DISPLAY_COUNT);
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
      .slice(0, MOVIE_LIST_DISPLAY_COUNT);
  }, [movies]);

  const highestRevenueMovies = useMemo(() => {
    if (!topRevenueData?.data_top) return [];
    return topRevenueData.data_top.slice(0, MOVIE_LIST_DISPLAY_COUNT);
  }, [topRevenueData]);

  if (isLoading) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                {t.home.loadingMovies}
              </p>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-error-DEFAULT text-lg font-semibold mb-2">
                {t.home.errorLoadingMovies}
              </p>
              <p className="text-dark-text-secondary text-sm">
                {error.message || t.home.unknownError}
              </p>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-dark-text text-2xl font-bold mb-2">
                {t.home.noMoviesAvailable}
              </h2>
              <p className="text-dark-text-secondary">
                {t.home.checkBackLater}
              </p>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <div className="bg-dark-bg pt-20 pb-16">
        <Container>
          {/* Banner Carousel */}
          {movies && movies.length > 0 && (
            <div className="mb-12">
              <BannerCarousel movies={movies} />
            </div>
          )}

          {/* Recommendations Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-text">
                {t.home.recommendations}
              </h2>
            </div>
            {!currentAccount && (
              <div className="bg-dark-card rounded-card p-6 text-center mb-6">
                <p className="text-dark-text-secondary mb-2">
                  {t.home.loginForRecommendations}
                </p>
                <a
                  href="/login"
                  className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
                >
                  {t.home.login} →
                </a>
              </div>
            )}
            {currentAccount && (
              <>
                {/* Realtime recommendations (prioritized) */}
                {recommendedMoviesRealtime &&
                  recommendedMoviesRealtime.length > 0 && (
                    <div key="realtime-recommendations">
                      <MovieCarousel
                        movies={recommendedMoviesRealtime.slice(0, 12)}
                        title={t.home.basedOnYourActivity}
                        onAddToList={handleAddToList}
                      />
                    </div>
                  )}
                {/* Collaborative recommendations (fallback or additional) */}
                {recommendedMoviesCollaborative &&
                  recommendedMoviesCollaborative.length > 0 && (
                    <div
                      key="collaborative-recommendations"
                      className={
                        recommendedMoviesRealtime &&
                        recommendedMoviesRealtime.length > 0
                          ? "mt-8"
                          : ""
                      }
                    >
                      <MovieCarousel
                        movies={recommendedMoviesCollaborative.slice(0, 12)}
                        title={t.home.forYou}
                        onAddToList={handleAddToList}
                      />
                    </div>
                  )}
              </>
            )}
          </div>

          {/* Most Popular */}
          {mostPopularMovies.length > 0 && (
            <div className="mb-12">
              <MovieCarousel
                movies={mostPopularMovies}
                title={t.home.mostPopular}
                onAddToList={handleAddToList}
              />
            </div>
          )}

          {/* Most Favourites */}
          {mostFavouritesMovies.length > 0 && (
            <div className="mb-12">
              <MovieCarousel
                movies={mostFavouritesMovies}
                title={t.home.highestRated}
                onAddToList={handleAddToList}
              />
            </div>
          )}

          {/* Highest Revenue */}
          {highestRevenueMovies.length > 0 && (
            <div className="mb-0">
              <MovieCarousel
                movies={highestRevenueMovies}
                title={t.home.highestRevenue}
                onAddToList={handleAddToList}
              />
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default HomePage;
