"use client";

import { useEffect, useState, useMemo, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import MovieCard from "@/app/components/common/MovieCard";
import {
  useGetAllMovies,
  useAddToList,
  useNaturalLanguageSearch,
} from "@/app/lib/api/hooks";
import { useI18n, translate } from "@/app/lib/i18n";
import { useToast } from "@/app/components/common/Toast";
import type { Movie } from "@/types/api.types";

function SearchContent() {
  const { t } = useI18n();
  const toast = useToast();
  const searchParams = useSearchParams();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("0");
  const [searchMode, setSearchMode] = useState<"normal" | "natural">("normal");
  const { data: moviesResponse, isLoading } = useGetAllMovies(1, 50);
  const movies = moviesResponse?.data || [];
  const { trigger: naturalSearchTrigger, isMutating: isNaturalSearching } =
    useNaturalLanguageSearch();
  const [naturalSearchResults, setNaturalSearchResults] = useState<Movie[]>([]);
  const [naturalSearchError, setNaturalSearchError] = useState<string | null>(
    null,
  );
  const [naturalSearchPage, setNaturalSearchPage] = useState(1);
  const [naturalSearchPagination, setNaturalSearchPagination] = useState<{
    page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  } | null>(null);
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
      const q = searchParams.get("q");
      const f = searchParams.get("filter");
      const mode = searchParams.get("mode") as "normal" | "natural" | null;
      if (q) setQuery(decodeURIComponent(q));
      if (f) setFilter(f);
      if (mode === "natural" || mode === "normal") setSearchMode(mode);
    }
  }, [searchParams]);

  // Handle natural language search
  const handleNaturalSearch = useCallback(
    async (page: number = 1) => {
      if (!query || !query.trim()) {
        setNaturalSearchResults([]);
        setNaturalSearchPagination(null);
        return;
      }

      setNaturalSearchError(null);
      try {
        console.log("Calling natural search with:", {
          query: query.trim(),
          page,
          page_size: 50,
        });
        const result = await naturalSearchTrigger({
          query: query.trim(),
          page,
          page_size: 50,
        });
        console.log("Natural search result:", result);
        if (result?.data) {
          console.log(
            "Setting natural search results:",
            result.data.length,
            "movies",
          );
          setNaturalSearchResults(result.data);
          if (result.pagination) {
            setNaturalSearchPagination(result.pagination);
          } else {
            setNaturalSearchPagination(null);
          }
        } else {
          console.log("No data in result, clearing results");
          setNaturalSearchResults([]);
          setNaturalSearchPagination(null);
        }
      } catch (error: any) {
        console.error("Natural search error:", error);
        setNaturalSearchError(
          error?.message || "Error performing natural language search",
        );
        setNaturalSearchResults([]);
        setNaturalSearchPagination(null);
        toast.error(
          error?.message || "Error performing natural language search",
        );
      }
    },
    [query, naturalSearchTrigger, toast],
  );

  // Handle search button click or Enter key
  const handleSearch = useCallback(() => {
    if (!query || !query.trim()) {
      setNaturalSearchResults([]);
      setNaturalSearchPagination(null);
      return;
    }

    if (searchMode === "natural") {
      setNaturalSearchPage(1);
      handleNaturalSearch(1);
    }
    // Normal mode doesn't need explicit search trigger as it filters client-side
  }, [query, searchMode, handleNaturalSearch]);

  // Handle Enter key press
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const handleAddToList = (movieName: string) => {
    if (!currentAccount) {
      toast.warning(t.home.pleaseLoginToAdd);
      return;
    }
    addToListTrigger({ userName: currentAccount, movieName });
  };

  const filteredMovies = useMemo(() => {
    // If natural search mode, return natural search results (only if we have results or are searching)
    if (searchMode === "natural") {
      // Only return results if we have them, or if we're currently searching
      // Don't show all movies if no search has been performed
      console.log(
        "Natural search mode - results:",
        naturalSearchResults.length,
      );
      return naturalSearchResults;
    }

    // Normal search mode - use existing logic
    if (!movies || !query) return [];

    const lowerQuery = query.toLowerCase();

    return movies.filter((movie) => {
      switch (filter) {
        case "1": // Movie Name
          return movie.movie_name?.toLowerCase().includes(lowerQuery);
        case "2": // Year
          return String(movie.movie_year || "").includes(query);
        case "3": // Rating
          const rating = movie.rating
            ? String(movie.rating).includes("/")
              ? String(movie.rating).split("/")[0]
              : String(movie.rating)
            : "";
          return rating.includes(query);
        default: // All
          return (
            movie.movie_name?.toLowerCase().includes(lowerQuery) ||
            String(movie.movie_year || "").includes(query) ||
            movie.describe_movie?.toLowerCase().includes(lowerQuery)
          );
      }
    });
  }, [movies, query, filter, searchMode, naturalSearchResults]);

  const isLoadingResults =
    searchMode === "natural" ? isNaturalSearching : isLoading;

  if (isLoading && searchMode === "normal") {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                {t.search.loading}
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
          <h1 className="text-3xl font-bold text-dark-text mb-6">
            {query
              ? translate(t.search.searchResults, { query })
              : t.search.searchMovies}
          </h1>

          {/* Search Input */}
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.navbar.searchPlaceholder || "Search movies..."}
              className="flex-1 px-4 py-3 rounded-input bg-dark-card border border-dark-border text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="px-6 py-3 bg-primary-600 text-white rounded-input font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-bg"
            >
              {t.navbar.search || "Search"}
            </button>
          </div>

          {/* Search Mode Toggle */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-dark-text-secondary">Search Mode:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSearchMode("normal")}
                className={`px-4 py-2 rounded-input text-sm font-medium transition-colors ${
                  searchMode === "normal"
                    ? "bg-primary-600 text-white"
                    : "bg-dark-card text-dark-text-secondary hover:bg-dark-border"
                }`}
              >
                Normal Search
              </button>
              <button
                type="button"
                onClick={() => setSearchMode("natural")}
                className={`px-4 py-2 rounded-input text-sm font-medium transition-colors ${
                  searchMode === "natural"
                    ? "bg-primary-600 text-white"
                    : "bg-dark-card text-dark-text-secondary hover:bg-dark-border"
                }`}
              >
                Natural Language Search
              </button>
            </div>
          </div>

          {/* Filter for Normal Mode */}
          {searchMode === "normal" && (
            <div className="mb-6">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 rounded-input bg-dark-card border border-dark-border text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="0">All</option>
                <option value="1">Movie Name</option>
                <option value="2">Year</option>
                <option value="3">Rating</option>
              </select>
            </div>
          )}

          {/* Natural Search Info */}
          {searchMode === "natural" && (
            <div className="mb-6 p-4 bg-dark-card rounded-card border border-dark-border">
              <p className="text-dark-text-secondary text-sm">
                💡 Try natural language queries like: &quot;action movies from
                2020 with high ratings&quot; or &quot;comedy films with Tom
                Hanks&quot;
              </p>
            </div>
          )}

          {/* Loading indicator for natural search */}
          {isNaturalSearching && searchMode === "natural" && (
            <div className="mb-8 flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-600" />
              <p className="text-dark-text-secondary text-sm">
                Searching with AI...
              </p>
            </div>
          )}

          {/* Error message for natural search */}
          {naturalSearchError && searchMode === "natural" && (
            <div className="mb-6 p-4 bg-error-DEFAULT/10 border border-error-DEFAULT rounded-card">
              <p className="text-error-DEFAULT text-sm">{naturalSearchError}</p>
            </div>
          )}

          {query && (
            <p className="text-dark-text-secondary mb-4">
              {searchMode === "natural" && naturalSearchPagination
                ? translate(t.search.foundResults, {
                    count: naturalSearchPagination.total_count,
                    plural:
                      naturalSearchPagination.total_count !== 1 ? "s" : "",
                  }) +
                  ` (Page ${naturalSearchPagination.page} of ${naturalSearchPagination.total_pages})`
                : searchMode === "natural" && isNaturalSearching
                  ? "Searching..."
                  : searchMode === "natural" &&
                      naturalSearchResults.length === 0 &&
                      !isNaturalSearching
                    ? "No results found. Try a different search query."
                    : translate(t.search.foundResults, {
                        count: filteredMovies.length,
                        plural: filteredMovies.length !== 1 ? "s" : "",
                      })}
            </p>
          )}

          {filteredMovies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.movie_id}
                    movie={movie}
                    onAddToList={handleAddToList}
                  />
                ))}
              </div>

              {/* Pagination for Natural Search */}
              {searchMode === "natural" &&
                naturalSearchPagination &&
                naturalSearchPagination.total_pages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => {
                        const newPage = naturalSearchPage - 1;
                        setNaturalSearchPage(newPage);
                        handleNaturalSearch(newPage);
                      }}
                      disabled={!naturalSearchPagination.has_previous}
                      className={`px-4 py-2 rounded-input text-sm font-medium transition-colors ${
                        naturalSearchPagination.has_previous
                          ? "bg-primary-600 text-white hover:bg-primary-700"
                          : "bg-dark-card text-dark-text-secondary cursor-not-allowed"
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-dark-text-secondary">
                      Page {naturalSearchPagination.page} of{" "}
                      {naturalSearchPagination.total_pages}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newPage = naturalSearchPage + 1;
                        setNaturalSearchPage(newPage);
                        handleNaturalSearch(newPage);
                      }}
                      disabled={!naturalSearchPagination.has_next}
                      className={`px-4 py-2 rounded-input text-sm font-medium transition-colors ${
                        naturalSearchPagination.has_next
                          ? "bg-primary-600 text-white hover:bg-primary-700"
                          : "bg-dark-card text-dark-text-secondary cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
            </>
          ) : query ? (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary text-lg">
                {t.search.noMoviesFound}
              </p>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary text-lg">
                {t.search.enterSearchQuery}
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

function SearchPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar currentAccount={null} />
          <div className="bg-dark-bg pt-20 pb-16">
            <Container>
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
                <p className="mt-4 text-dark-text-secondary">Loading...</p>
              </div>
            </Container>
          </div>
        </>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

export default SearchPage;
