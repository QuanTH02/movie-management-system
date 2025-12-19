"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import {
  MovieHeader,
  MovieMedia,
  MovieIntro,
  TopCastSection,
  StorylineSection,
  DetailsSection,
  UserReviewsSection,
  BoxOfficeSection,
  DidYouKnowSection,
  RecommendationsSidebar,
} from "@/app/components/detail";
import {
  useGetMovieDetail,
  useGetMovieGenres,
  useGetMovieDirectors,
  useGetMovieTrailers,
  useGetMovieCast,
  useGetMovieWriters,
  useGetMovieTaglines,
  useGetMovieDidYouKnow,
  useGetMovieReviews,
  useGetMovieBoxOffice,
  useGetMovieCountry,
  useGetMovieLanguage,
  useGetMovieLocations,
  useGetMovieCompanies,
  useGetRecommendContentBased,
} from "@/app/lib/api/hooks";
import { useI18n, translate } from "@/app/lib/i18n";
import type { Movie } from "@/types/api.types";

function DetailContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [movieName, setMovieName] = useState<string | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  // Get movie name from URL params only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
      const urlMovie = searchParams.get("movie");
      if (urlMovie) {
        setMovieName(decodeURIComponent(urlMovie));
      } else {
        // Redirect to home if no movie parameter
        router.push("/");
      }
    }
  }, [searchParams, router]);

  const {
    data: movieDetail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useGetMovieDetail(movieName);
  const { data: genres } = useGetMovieGenres(movieName);
  const { data: directors } = useGetMovieDirectors(movieName);
  const { data: trailers } = useGetMovieTrailers(movieName);
  const { data: cast } = useGetMovieCast(movieName);
  const { data: writers } = useGetMovieWriters(movieName);
  const { data: taglines } = useGetMovieTaglines(movieName);
  const { data: didYouKnow } = useGetMovieDidYouKnow(movieName);
  const { data: reviews } = useGetMovieReviews(movieName);
  const { data: boxOffice } = useGetMovieBoxOffice(movieName);
  const { data: countries } = useGetMovieCountry(movieName);
  const { data: languages } = useGetMovieLanguage(movieName);
  const { data: locations } = useGetMovieLocations(movieName);
  const { data: companies } = useGetMovieCompanies(movieName);
  const { data: recommendations } = useGetRecommendContentBased(movieName);

  const movie = useMemo(() => {
    if (!movieDetail) return null;

    // Handle different response structures
    if (movieDetail.data) {
      const data = movieDetail.data;
      if (Array.isArray(data)) {
        if (data.length === 0) return null;
        return data[0] as Movie;
      }
      return data as Movie;
    }

    // If response is directly a Movie object
    if ((movieDetail as any).movie_name) {
      return movieDetail as unknown as Movie;
    }

    return null;
  }, [movieDetail]);

  const mainTrailer = useMemo(() => {
    if (trailers && trailers.length > 0) {
      return trailers[0].link_trailer;
    }
    if (movie?.main_trailer) {
      return movie.main_trailer;
    }
    return "";
  }, [trailers, movie]);

  const topCast = useMemo(() => {
    if (!cast || cast.length === 0) return [];
    return cast.slice(0, 10);
  }, [cast]);

  const boxOfficeData = useMemo(() => {
    if (!boxOffice || boxOffice.length === 0) return null;
    return boxOffice[0];
  }, [boxOffice]);

  if (isLoadingDetail) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                {t.detail.loadingDetails}
              </p>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (detailError || !movieName) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-dark-text text-2xl font-bold mb-2">
                {!movieName
                  ? t.detail.movieNameRequired
                  : t.detail.movieNotFound}
              </h2>
              <p className="text-dark-text-secondary mb-4">
                {!movieName
                  ? t.detail.provideMovieName
                  : t.detail.checkMovieName}
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

  if (!movie) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-dark-text text-2xl font-bold mb-2">
                {t.detail.movieNotFound}
              </h2>
              <p className="text-dark-text-secondary mb-4">
                {translate(t.detail.movieNotFoundMessage, {
                  movieName,
                })}
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

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <div className="bg-dark-bg pt-20 pb-16">
        <Container>
          {/* Navigation Links */}
          <div className="flex items-center justify-end gap-4 mb-6">
            <Link
              href={`/cast-and-crew?movie=${encodeURIComponent(movieName)}`}
              className="text-dark-text hover:text-primary-600 transition-colors duration-hover font-semibold"
            >
              {t.detail.castAndCrew}
            </Link>
            <span className="text-dark-text">•</span>
            <Link
              href={`/user-review?movie=${encodeURIComponent(movieName)}`}
              className="text-dark-text hover:text-primary-600 transition-colors duration-hover font-semibold"
            >
              {t.detail.userReviews}
            </Link>
          </div>

          {/* Header */}
          <MovieHeader movie={movie} movieName={movieName} />

          {/* Media Section */}
          <MovieMedia
            movie={movie}
            mainTrailer={mainTrailer}
            movieName={movieName}
          />

          {/* Intro Section */}
          <MovieIntro
            genres={genres}
            description={movie.describe_movie}
            directors={directors}
            writers={writers}
            cast={cast}
            reviewCount={reviews?.length || 0}
            movieName={movieName}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Top Cast */}
              <TopCastSection cast={topCast} />

              {/* Storyline */}
              <StorylineSection
                storyline={
                  movie.storyline ? String(movie.storyline) : undefined
                }
                taglines={taglines}
                genres={genres}
              />

              {/* Did You Know */}
              <DidYouKnowSection items={didYouKnow} />

              {/* User Reviews */}
              <UserReviewsSection reviews={reviews} movieName={movieName} />

              {/* Details */}
              <DetailsSection
                releaseDate={
                  movie.release_date
                    ? String(movie.release_date)
                    : (movie as any).release_date
                      ? String((movie as any).release_date)
                      : ""
                }
                countries={countries}
                languages={languages}
                locations={locations}
                companies={companies}
              />

              {/* Box Office */}
              <BoxOfficeSection boxOffice={boxOfficeData} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <RecommendationsSidebar recommendations={recommendations} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

function DetailPage() {
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
      <DetailContent />
    </Suspense>
  );
}

export default DetailPage;
