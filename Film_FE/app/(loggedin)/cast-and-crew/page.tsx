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

function CastAndCrewContent() {
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
                Movie or Director required
              </h2>
              <p className="text-dark-text-secondary mb-4">
                Please provide a movie name or director name in the URL.
              </p>
              <Link
                href="/"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
              >
                ← Back to Home
              </Link>
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
          <div className="mb-6">
            <Link
              href={
                movieName
                  ? `/detail?movie=${encodeURIComponent(movieName)}`
                  : "/"
              }
              className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
            >
              ← Back
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-dark-text mb-8">
            {movieName
              ? `Cast & Crew: ${movieName}`
              : `Director: ${directorName}`}
          </h1>

          {/* Directors */}
          {directors && directors.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-text mb-6">
                Directors
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
          {writers && writers.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-dark-text mb-6">
                Writers
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
          {cast && cast.length > 0 && (
            <div className="mb-0">
              <h2 className="text-2xl font-bold text-dark-text mb-6">Cast</h2>
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

          {(!cast || cast.length === 0) &&
            (!directors || directors.length === 0) &&
            (!writers || writers.length === 0) && (
              <div className="text-center py-20">
                <p className="text-dark-text-secondary">
                  No cast and crew information available.
                </p>
              </div>
            )}
        </Container>
      </div>
    </>
  );
}

function CastAndCrewPage() {
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
      <CastAndCrewContent />
    </Suspense>
  );
}

export default CastAndCrewPage;
