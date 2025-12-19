"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import Card from "@/app/components/common/Card";
import {
  useGetMovieCast,
  useGetMovieDirectors,
  useGetMovieWriters,
} from "@/app/lib/api/hooks";
import { useI18n, translate } from "@/app/lib/i18n";

function CastAndCrewContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const [movieName, setMovieName] = useState<string | null>(null);
  const [directorName, setDirectorName] = useState<string | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
      const movie = searchParams.get("movie");
      const director = searchParams.get("director");
      if (movie) {
        setMovieName(decodeURIComponent(movie));
      }
      if (director) {
        setDirectorName(decodeURIComponent(director));
      }
    }
  }, [searchParams]);

  const { data: cast } = useGetMovieCast(movieName);
  const { data: directors } = useGetMovieDirectors(movieName);
  const { data: writers } = useGetMovieWriters(movieName);

  if (!movieName && !directorName) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-dark-text text-2xl font-bold mb-2">
                {t.pages.castAndCrew.movieOrDirectorRequired}
              </h2>
              <p className="text-dark-text-secondary mb-4">
                {t.pages.castAndCrew.provideMovieOrDirector}
              </p>
              <Link
                href="/"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
              >
                {t.detail.backToHome}
              </Link>
            </div>
          </Container>
        </div>
      </>
    );
  }

  const hasDirectors = directors && directors.length > 0;
  const hasWriters = writers && writers.length > 0;
  const hasCast = cast && cast.length > 0;

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <div className="bg-dark-bg pt-20 pb-16">
        <Container>
          <div className="mb-6">
            <Link
              href={
                movieName
                  ? `/detail?movie=${encodeURIComponent(movieName)}`
                  : "/"
              }
              className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
            >
              {t.pages.castAndCrew.back}
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-dark-text mb-8">
            {movieName
              ? translate(t.pages.castAndCrew.castAndCrew, { movieName })
              : translate(t.pages.castAndCrew.director, { directorName })}
          </h1>

          {/* Directors */}
          {hasDirectors && (
            <div className={hasWriters || hasCast ? "mb-12" : "mb-0"}>
              <h2 className="text-2xl font-bold text-dark-text mb-6">
                {t.pages.castAndCrew.directors}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {directors.map((director, index) => (
                  <Card key={director.director_id || index} className="p-4">
                    <h3 className="text-lg font-semibold text-dark-text">
                      {director.director_name}
                    </h3>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Writers */}
          {hasWriters && (
            <div className={hasCast ? "mb-12" : "mb-0"}>
              <h2 className="text-2xl font-bold text-dark-text mb-6">
                {t.pages.castAndCrew.writers}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {writers.map((writer, index) => (
                  <Card key={writer.writers_id || index} className="p-4">
                    <h3 className="text-lg font-semibold text-dark-text">
                      {writer.name}
                    </h3>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Cast */}
          {hasCast && (
            <div className="mb-0">
              <h2 className="text-2xl font-bold text-dark-text mb-6">
                {t.pages.castAndCrew.cast}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cast.map((actor, index) => (
                  <Card key={actor.cast_id || index} className="p-4">
                    <h3 className="text-lg font-semibold text-dark-text mb-2">
                      {actor.name}
                    </h3>
                    {actor.character_name && (
                      <p className="text-dark-text-secondary text-sm">
                        as {actor.character_name}
                      </p>
                    )}
                    {actor.role && (
                      <p className="text-dark-text-secondary text-sm">
                        {actor.role}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {!hasCast && !hasDirectors && !hasWriters && (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary">
                {t.pages.castAndCrew.noInfoAvailable}
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

function CastAndCrewPage() {
  const { t } = useI18n();
  return (
    <Suspense
      fallback={
        <>
          <Navbar currentAccount={null} />
          <div className="bg-dark-bg pt-20 pb-16">
            <Container>
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
                <p className="mt-4 text-dark-text-secondary">
                  {t.common.loading}
                </p>
              </div>
            </Container>
          </div>
        </>
      }
    >
      <CastAndCrewContent />
    </Suspense>
  );
}

export default CastAndCrewPage;
