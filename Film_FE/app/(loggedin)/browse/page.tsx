"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import MovieCard from "@/app/components/common/MovieCard";
import { useGetAllMovies, useAddToList } from "@/app/lib/api/hooks";
import { useI18n } from "@/app/lib/i18n";
import { useToast } from "@/app/components/common/Toast";
import type { Movie } from "@/types/api.types";

function BrowsePage() {
  const { t } = useI18n();
  const toast = useToast();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "rating" | "year" | "revenue">(
    "name",
  );
  const [filterGenre, setFilterGenre] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
  const {
    data: moviesResponse,
    isLoading,
    error,
  } = useGetAllMovies(currentPage, pageSize);

  // Extract movies and pagination from response
  const movies = moviesResponse?.data || [];
  const pagination = moviesResponse?.pagination;
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
      setCurrentAccount(localStorage.getItem("currentAccount"));
    }
  }, []);

  const handleAddToList = (movieName: string) => {
    if (!currentAccount) {
      toast.warning(t.home.pleaseLoginToAdd);
      return;
    }
    addToListTrigger({ userName: currentAccount, movieName });
  };

  const sortedAndFilteredMovies = useMemo(() => {
    if (!movies) return [];

    let filtered = [...movies];

    // Filter by genre (if we have genre data)
    if (filterGenre !== "all") {
      // This would need genre data from API
      // For now, just return all movies
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.movie_name || "").localeCompare(b.movie_name || "");
        case "rating":
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
        case "year":
          return (b.movie_year || 0) - (a.movie_year || 0);
        case "revenue":
          return (b.revenue || 0) - (a.revenue || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [movies, sortBy, filterGenre]);

  if (isLoading) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                {t.browse.loadingMovies}
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
                {t.browse.errorLoadingMovies}
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

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <div className="bg-dark-bg pt-20 pb-16">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark-text mb-6">
              {t.browse.browseMovies}
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-dark-text font-semibold">
                  {t.browse.sortBy}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "name" | "rating" | "year" | "revenue",
                    )
                  }
                  className="px-3 py-2 rounded-input bg-dark-card border border-dark-border text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">{t.browse.name}</option>
                  <option value="rating">{t.browse.rating}</option>
                  <option value="year">{t.browse.year}</option>
                  <option value="revenue">{t.browse.revenue}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-dark-text font-semibold">
                  {t.browse.genre}
                </label>
                <select
                  value={filterGenre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                  className="px-3 py-2 rounded-input bg-dark-card border border-dark-border text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">{t.browse.allGenres}</option>
                  {/* Genre options would be populated from API */}
                </select>
              </div>
            </div>
          </div>

          {/* Movies Grid */}
          {sortedAndFilteredMovies.length > 0 ? (
            <>
              <div className="mb-4 text-dark-text-secondary">
                {pagination
                  ? `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, pagination.total_count)} of ${pagination.total_count} movies`
                  : `Showing ${sortedAndFilteredMovies.length} movies`}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                {sortedAndFilteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.movie_id}
                    movie={movie}
                    onAddToList={handleAddToList}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={!pagination.has_previous}
                    className={`px-4 py-2 rounded-input text-sm font-medium transition-colors ${
                      pagination.has_previous
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-dark-card text-dark-text-secondary cursor-not-allowed"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-dark-text-secondary">
                    Page {pagination.page} of {pagination.total_pages}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) =>
                        Math.min(pagination.total_pages, p + 1),
                      )
                    }
                    disabled={!pagination.has_next}
                    className={`px-4 py-2 rounded-input text-sm font-medium transition-colors ${
                      pagination.has_next
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-dark-card text-dark-text-secondary cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary text-lg">
                {t.browse.noMoviesFound}
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default BrowsePage;
