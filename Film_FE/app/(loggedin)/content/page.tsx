"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import MovieCard from "@/app/components/common/MovieCard";
import { useGetAllMovies, useAddToList } from "@/app/lib/api/hooks";

function ContentPage() {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
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
    }
  }, []);

  const handleAddToList = (movieName: string) => {
    if (!currentAccount) {
      alert("Please login to add movies to your list");
      return;
    }
    addToListTrigger({ userName: currentAccount, movieName });
  };

  if (isLoading) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                Loading content...
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
          <h1 className="text-3xl font-bold text-dark-text mb-8">
            All Content
          </h1>

          {movies && movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie={movie}
                  onAddToList={handleAddToList}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary text-lg">
                No content available.
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default ContentPage;
