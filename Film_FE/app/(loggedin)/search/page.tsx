"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import MovieCard from "@/app/components/common/MovieCard";
import { useGetAllMovies, useAddToList } from "@/app/lib/api/hooks";
import type { Movie } from "@/types/api.types";

function SearchContent() {
  const searchParams = useSearchParams();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("0");
  const { data: movies, isLoading } = useGetAllMovies();
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
      const q = searchParams.get("q");
      const f = searchParams.get("filter");
      if (q) setQuery(decodeURIComponent(q));
      if (f) setFilter(f);
    }
  }, [searchParams]);

  const handleAddToList = (movieName: string) => {
    if (!currentAccount) {
      alert("Please login to add movies to your list");
      return;
    }
    addToListTrigger({ userName: currentAccount, movieName });
  };

  const filteredMovies = useMemo(() => {
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
  }, [movies, query, filter]);

  if (isLoading) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">Loading...</p>
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
            {query ? `Search Results for "${query}"` : "Search Movies"}
          </h1>

          {query && (
            <p className="text-dark-text-secondary mb-8">
              Found {filteredMovies.length} result
              {filteredMovies.length !== 1 ? "s" : ""}
            </p>
          )}

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie={movie}
                  onAddToList={handleAddToList}
                />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary text-lg">
                No movies found matching your search.
              </p>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary text-lg">
                Enter a search query to find movies.
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
