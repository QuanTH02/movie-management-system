"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import MovieCard from "@/app/components/common/MovieCard";
import { useGetAllMovies, useAddToList } from "@/app/lib/api/hooks";
import { useI18n } from "@/app/lib/i18n";
import { useToast } from "@/app/components/common/Toast";
import type { Movie } from "@/types/api.types";

function ContentPage() {
  const { t } = useI18n();
  const toast = useToast();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const { data: movies, isLoading } = useGetAllMovies();
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

  if (isLoading) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                {t.pages.content.loadingContent}
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
            {t.pages.content.allContent}
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
                {t.pages.content.noContentAvailable}
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default ContentPage;
