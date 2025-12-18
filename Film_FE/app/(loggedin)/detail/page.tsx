"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/common/Navbar";
import MovieCarousel from "@/app/components/common/MovieCarousel";
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

function DetailContent() {
  const searchParams = useSearchParams();
  const [movieName, setMovieName] = useState<string | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  const { data: movieDetail, isLoading: isLoadingDetail } =
    useGetMovieDetail(movieName);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
      const urlMovie = searchParams.get("movie");
      const storedMovie = localStorage.getItem("movie_name");
      setMovieName(urlMovie || storedMovie);
    }
  }, [searchParams]);

  const movie = useMemo(() => {
    if (!movieDetail?.data || movieDetail.data.length === 0) return null;
    return movieDetail.data[0];
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

  const topReviews = useMemo(() => {
    if (!reviews || reviews.length === 0) return [];
    return reviews.slice(0, 3);
  }, [reviews]);

  const boxOfficeData = useMemo(() => {
    if (!boxOffice || boxOffice.length === 0) return null;
    return boxOffice[0];
  }, [boxOffice]);

  if (isLoadingDetail) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="div-container mt-4" style={{ paddingTop: "56px" }}>
          <div className="text-center">Loading...</div>
        </div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="div-container mt-4" style={{ paddingTop: "56px" }}>
          <div className="text-center">Movie not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <div id="page_film">
        <div className="bg-film" style={{ marginTop: "0px" }}>
          <div className="div-container pt-2 pb-3">
            <div
              className="menu-float"
              style={{ width: "100%", textAlign: "right" }}
            >
              <ul>
                <li>
                  <Link
                    href={`/cast-and-crew?movie=${encodeURIComponent(movieName || "")}`}
                  >
                    <h6>Cast & Crew</h6>
                  </Link>
                </li>
                <i
                  className="fas fa-circle pl-1 pr-1"
                  style={{ fontSize: "2px", verticalAlign: "middle" }}
                ></i>
                <li>
                  <Link
                    href={`/user-review?movie=${encodeURIComponent(movieName || "")}`}
                  >
                    <h6>User review</h6>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="row">
              <div className="col-4">
                <h1 id="h1-name-movie">{movie.movie_name}</h1>
                <div className="float-left">
                  <ul className="pl-0">
                    {movie.year_manufacture && (
                      <li id="li-movie-year">
                        {String(movie.year_manufacture)}
                      </li>
                    )}
                    <i
                      className="fas fa-circle pl-1 pr-1"
                      style={{ fontSize: "2px", verticalAlign: "middle" }}
                    ></i>
                    <li>T18</li>
                    <i
                      className="fas fa-circle pl-1 pr-1"
                      style={{ fontSize: "2px", verticalAlign: "middle" }}
                    ></i>
                    <li id="li-movie-time">
                      {String(
                        (movie as any).time || movie.movie_time || "2h 38m",
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-4"></div>
              <div className="col-4" style={{ textAlign: "right" }}>
                <h6 className="mb-0 pb-0">IMDb RATING</h6>
                <Link
                  href={`/rating?movie=${encodeURIComponent(movieName || "")}`}
                  className="imdb-rating"
                >
                  <div
                    className="mr-0 pr-1 div-imdb-rating"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <i
                      className="fas fa-star"
                      style={{
                        color: "yellow",
                        fontSize: "24px",
                        marginRight: "8px",
                      }}
                    ></i>
                    <div>
                      <p className="m-0" id="p-movie-rating">
                        {movie.rating || "N/A"}
                      </p>
                      <p className="m-0" id="p-movie-vote">
                        {movie.total_vote || 0}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="row mt-3" id="row-img-trailer">
              <div className="col-3 pr-0 d-flex justify-content-center align-items-center position-relative">
                <div
                  className="ribbon-icon"
                  id="add_to_list_detail"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                    cursor: "pointer",
                  }}
                >
                  <svg
                    className="ipc-watchlist-ribbon__bg"
                    width="24px"
                    height="34px"
                    viewBox="0 0 24 34"
                    xmlns="http://www.w3.org/2000/svg"
                    role="presentation"
                  >
                    <polygon
                      className="ipc-watchlist-ribbon__bg-ribbon"
                      fill="transparent"
                      points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
                    ></polygon>
                    <polygon
                      className="ipc-watchlist-ribbon__bg-hover"
                      points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
                    ></polygon>
                    <polygon
                      className="ipc-watchlist-ribbon__bg-shadow"
                      points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"
                    ></polygon>
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="24"
                      fill="#888888"
                    >
                      +
                    </text>
                  </svg>
                </div>
                {movie.main_img && (
                  <img
                    id="img_movie"
                    src={movie.main_img as string}
                    alt={movie.movie_name}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
              <div className="col-7 pl-1 pr-0 video-trailer d-flex justify-content-center align-items-center">
                {mainTrailer && (
                  <video id="link-trailer-id" controls width="100%">
                    <source src={mainTrailer as string} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="col-2 pl-1">
                <button
                  id="movie_all_trailer"
                  className="right-trailer-center"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <i className="fa-solid fa-play mb-2"></i>
                    <p className="mb-0">Video</p>
                  </div>
                </button>
                <Link
                  href={`/img?movie=${encodeURIComponent(movieName || "")}`}
                  className="right-trailer-center"
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <i className="fa-solid fa-image mb-2"></i>
                    <p className="mb-0">Image</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="mt-3 div-intro">
              <div className="row">
                <div className="col-8">
                  {genres && genres.length > 0 && (
                    <div className="genres">
                      <ul className="pl-0" id="ul-list-genres">
                        {genres.map((genre, index) => (
                          <li key={genre.genres_id || index}>
                            <Link
                              href={`/search?genre=${encodeURIComponent(genre.genres_name)}`}
                            >
                              {genre.genres_name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {movie.describe_movie && (
                    <div>
                      <p
                        className="intro"
                        id="p-movie-describe"
                        style={{ fontSize: "18px" }}
                      >
                        {String(movie.describe_movie)}
                      </p>
                    </div>
                  )}

                  <hr />
                  <div className="director-writer-star">
                    {directors && directors.length > 0 && (
                      <>
                        <div className="text-inline" id="div-movie-director">
                          <p>Director</p>
                          {directors.map((director, index) => (
                            <span key={director.director_id || index}>
                              <Link
                                href={`/cast-and-crew?director=${encodeURIComponent(director.director_name)}`}
                              >
                                {director.director_name}
                              </Link>
                              {index < directors.length - 1 && (
                                <i
                                  className="fas fa-circle pl-1 pr-1"
                                  style={{
                                    fontSize: "2px",
                                    verticalAlign: "middle",
                                  }}
                                ></i>
                              )}
                            </span>
                          ))}
                        </div>
                        <hr className="mt-0" />
                      </>
                    )}
                    {writers && writers.length > 0 && (
                      <>
                        <div className="text-inline" id="div-movie-writer">
                          <p>Writer</p>
                          {writers.slice(0, 3).map((writer, index) => (
                            <span key={writer.writers_id || index}>
                              <a href="#">{writer.name}</a>
                              {index < Math.min(writers.length, 3) - 1 && (
                                <i
                                  className="fas fa-circle pl-1 pr-1"
                                  style={{
                                    fontSize: "2px",
                                    verticalAlign: "middle",
                                  }}
                                ></i>
                              )}
                            </span>
                          ))}
                        </div>
                        <hr className="mt-0" />
                      </>
                    )}
                    {cast && cast.length > 0 && (
                      <div
                        className="intro-stars text-inline-link"
                        id="div-movie-star"
                      >
                        <p className="mb-0">Stars</p>
                        {cast.slice(0, 3).map((star, index) => (
                          <span key={star.cast_id || index}>
                            <a href="#">{star.name}</a>
                            {index < Math.min(cast.length, 3) - 1 && (
                              <i
                                className="fas fa-circle pl-1 pr-1"
                                style={{
                                  fontSize: "2px",
                                  verticalAlign: "middle",
                                }}
                              ></i>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-4 intro-user-review">
                  <Link
                    href={`/user-review?movie=${encodeURIComponent(movieName || "")}`}
                    id="a-total-review"
                  >
                    <p
                      className="intro-user-review-icon"
                      id="p-movie-total-review-detail"
                    >
                      {reviews ? reviews.length : 0}
                    </p>
                    <p>User review</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-content">
          <div className="div-container">
            <div className="content pt-4">
              <div className="row">
                <div className="col-8">
                  <Link
                    href={`/awards?movie=${encodeURIComponent(movieName || "")}`}
                  >
                    <div className="content-awards pb-0 pt-0">
                      <p className="mb-0 pt-2 pb-2 pl-2 d-inline-block">
                        Awards
                      </p>
                      <div
                        className="link-stars pb-0 pr-2"
                        style={{
                          display: "inline",
                          float: "right",
                          paddingTop: "8px",
                        }}
                      >
                        <Link
                          href={`/awards?movie=${encodeURIComponent(movieName || "")}`}
                        >
                          <i className="fa-solid fa-chevron-right"></i>
                        </Link>
                      </div>
                    </div>
                  </Link>

                  <div className="top-cast">
                    <a href="#">
                      <h3 className="topic mb-0 mt-4">
                        | Top cast <i className="fas fa-chevron-right"></i>
                      </h3>
                    </a>

                    <ul className="pl-0 mt-3">
                      <div className="row">
                        <div className="col-6" id="div-movie-cast-col-1">
                          {topCast
                            .filter((_, index) => index % 2 === 0)
                            .map((actor, index) => (
                              <li key={actor.cast_id || index}>
                                <h5>{actor.name}</h5>
                                <p>
                                  {String(
                                    actor.character_name ||
                                      (actor as any).role ||
                                      "Actor",
                                  )}
                                </p>
                              </li>
                            ))}
                        </div>
                        <div className="col-6" id="div-movie-cast-col-2">
                          {topCast
                            .filter((_, index) => index % 2 === 1)
                            .map((actor, index) => (
                              <li key={actor.cast_id || index}>
                                <h5>{actor.name}</h5>
                                <p>
                                  {String(
                                    actor.character_name ||
                                      (actor as any).role ||
                                      "Actor",
                                  )}
                                </p>
                              </li>
                            ))}
                        </div>
                      </div>
                    </ul>

                    <div className="director-writer-star">
                      {directors && directors.length > 0 && (
                        <>
                          <div
                            className="text-inline"
                            id="div-movie-director-content"
                          >
                            <p>Director</p>
                            {directors.map((director, index) => (
                              <span key={director.director_id || index}>
                                <a href="#">{director.director_name}</a>
                                {index < directors.length - 1 && (
                                  <i
                                    className="fas fa-circle pl-1 pr-1"
                                    style={{
                                      fontSize: "2px",
                                      verticalAlign: "middle",
                                    }}
                                  ></i>
                                )}
                              </span>
                            ))}
                          </div>
                          <hr className="mt-0" />
                        </>
                      )}
                      {writers && writers.length > 0 && (
                        <>
                          <div
                            className="text-inline"
                            id="div-movie-writer-content"
                          >
                            <p>Writer</p>
                            {writers.map((writer, index) => (
                              <span key={writer.writers_id || index}>
                                <a href="#">{writer.name}</a>
                                {index < writers.length - 1 && (
                                  <i
                                    className="fas fa-circle pl-1 pr-1"
                                    style={{
                                      fontSize: "2px",
                                      verticalAlign: "middle",
                                    }}
                                  ></i>
                                )}
                              </span>
                            ))}
                          </div>
                          <hr className="mt-0" />
                        </>
                      )}
                      <Link
                        href={`/cast-and-crew?movie=${encodeURIComponent(movieName || "")}`}
                        className="intro-stars text-inline-link"
                      >
                        <p className="mb-0">All cast & crew</p>
                        <div
                          className="link-stars"
                          style={{
                            display: "inline",
                            float: "right",
                            marginRight: "12px",
                          }}
                        >
                          <Link
                            href={`/cast-and-crew?movie=${encodeURIComponent(movieName || "")}`}
                          >
                            <i className="fa-solid fa-chevron-right"></i>
                          </Link>
                        </div>
                      </Link>
                      <hr />
                    </div>
                  </div>

                  <div className="storyline mt-4">
                    <a href="#">
                      <h3 className="topic mb-0 mt-2">
                        | Storyline <i className="fas fa-chevron-right"></i>
                      </h3>
                    </a>

                    <div className="storyline-content">
                      {movie.storyline && (
                        <p
                          className="mt-3"
                          style={{ fontSize: "16px" }}
                          id="p-movie-storyline"
                        >
                          {String(movie.storyline)}
                        </p>
                      )}

                      <hr className="mt-0" />
                      {taglines && taglines.length > 0 && (
                        <div className="tagline text-inline-link">
                          <p className="mb-0">Taglines</p>
                          <p id="p-movie-tagline" style={{ fontWeight: 400 }}>
                            {String(
                              (taglines[0] as any).taglines_content ||
                                taglines[0].tagline ||
                                "",
                            )}
                          </p>
                          <div
                            className="link-stars"
                            style={{
                              display: "inline",
                              float: "right",
                              marginRight: "12px",
                            }}
                          >
                            <a href="#">
                              <i className="fa-solid fa-chevron-right"></i>
                            </a>
                          </div>
                        </div>
                      )}
                      <hr className="mt-0" />
                      {genres && genres.length > 0 && (
                        <div className="tagline text-inline-link">
                          <p className="mb-0">Genres</p>
                          <div
                            style={{ fontWeight: 400, display: "inline-block" }}
                            id="div-movie-genres"
                          >
                            {genres.map((genre, index) => (
                              <span key={genre.genres_id || index}>
                                <Link
                                  href={`/search?genre=${encodeURIComponent(genre.genres_name)}`}
                                >
                                  {genre.genres_name}
                                </Link>
                                {index < genres.length - 1 && (
                                  <i
                                    className="fas fa-circle pl-1 pr-1"
                                    style={{
                                      fontSize: "2px",
                                      verticalAlign: "middle",
                                    }}
                                  ></i>
                                )}
                              </span>
                            ))}
                          </div>
                          <div
                            className="link-stars"
                            style={{
                              display: "inline",
                              float: "right",
                              marginRight: "12px",
                            }}
                          >
                            <a href="#">
                              <i className="fa-solid fa-chevron-right"></i>
                            </a>
                          </div>
                        </div>
                      )}
                      <hr />
                    </div>
                  </div>

                  {didYouKnow && didYouKnow.length > 0 && (
                    <div className="did-you-know mt-4">
                      <a href="#">
                        <h3 className="topic mb-0 mt-2">
                          | Did you know{" "}
                          <i className="fas fa-chevron-right"></i>
                        </h3>
                      </a>

                      <div
                        className="did-you-know-content mt-4"
                        id="div-movie-didyouknow"
                      >
                        {didYouKnow.map((item, index) => (
                          <div
                            key={item.didyouknow_id || index}
                            className="did-you-know-content-element p-3 mb-2"
                          >
                            <p className="did-you-know-content-element-name mb-0">
                              {item.name ||
                                (item.trivia
                                  ? "Trivia"
                                  : item.goofs
                                    ? "Goofs"
                                    : item.quotes
                                      ? "Quotes"
                                      : "Fact")}
                            </p>
                            <p className="did-you-know-content-element-content mb-0">
                              {item.content ||
                                item.trivia ||
                                item.goofs ||
                                item.quotes ||
                                ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="user-reviews mt-4">
                    <a href="#">
                      <h3 className="topic mb-0 mt-2">
                        | User reviews <i className="fas fa-chevron-right"></i>
                      </h3>
                    </a>

                    <Link
                      href={`/user-review?movie=${encodeURIComponent(movieName || "")}`}
                      className="mt-2 link-to-review"
                      style={{ float: "right", alignItems: "center" }}
                    >
                      <p
                        className="mb-0 p-1"
                        style={{ color: "rgb(92, 0, 252)" }}
                      >
                        <i
                          className="fa-solid fa-plus"
                          style={{ color: "rgb(92, 0, 252)" }}
                        ></i>{" "}
                        Review
                      </p>
                    </Link>

                    <div
                      className="user-reviews-content mt-4"
                      id="div-movie-review"
                    >
                      {topReviews.map((review, index) => (
                        <div
                          key={review.film_review_id || index}
                          className="user-reviews-content-element p-3 mb-2"
                        >
                          <a href="#">
                            <p
                              className="user-reviews-content-element-name mb-2"
                              style={{
                                display: "inline-block",
                                fontSize: "18px",
                              }}
                            >
                              {review.name_review}
                            </p>
                            <p
                              className="user-reviews-content-element-rate mb-0"
                              style={{ float: "right" }}
                            >
                              <i
                                className="fas fa-star pr-2"
                                style={{
                                  color: "yellow",
                                  display: "inline-block",
                                  fontSize: "14px",
                                }}
                              ></i>
                              {review.star_review}/10
                            </p>
                            <p className="user-reviews-content-element-content mb-0">
                              {review.content_review}
                            </p>
                          </a>
                          <br />
                          <br />
                          <div className="review">
                            <i
                              className="fa-regular fa-thumbs-up d-inline-block"
                              style={{ fontSize: "20px", width: "100px" }}
                            >
                              <p
                                className="d-inline-block pl-2 pr-4 like-count"
                                style={{ fontSize: "14px" }}
                              >
                                {review.like_count || 0}
                              </p>
                            </i>
                            <i
                              className="fa-regular fa-thumbs-down d-inline-block"
                              style={{ fontSize: "20px", width: "100px" }}
                            >
                              <p
                                className="d-inline-block pl-2 pr-4 dislike-count"
                                style={{ fontSize: "14px" }}
                              >
                                {review.dislike_count || 0}
                              </p>
                            </i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="details mt-4">
                    <a href="#">
                      <h3 className="topic mb-4 mt-2">
                        | Details <i className="fas fa-chevron-right"></i>
                      </h3>
                    </a>

                    <div className="details-content">
                      <hr className="mt-0" />
                      {(movie.release_date || (movie as any).release_date) && (
                        <>
                          <div className="text-inline">
                            <p>Release date</p>
                            <p
                              style={{ fontWeight: 400 }}
                              id="p-movie-releasedate"
                            >
                              {String(
                                movie.release_date ||
                                  (movie as any).release_date,
                              )}
                            </p>
                          </div>
                          <hr className="mt-0" />
                        </>
                      )}
                      {countries && countries.length > 0 && (
                        <>
                          <div
                            className="text-inline-link"
                            id="div-movie-country"
                          >
                            <p>Countries of origin</p>
                            {countries.map((country, index) => (
                              <span key={country.countryorigin_id || index}>
                                <a href="#">
                                  {String(
                                    (country as any).country_origin_name ||
                                      country.country_name ||
                                      "",
                                  )}
                                </a>
                                {index < countries.length - 1 && (
                                  <i
                                    className="fas fa-circle pl-1 pr-1"
                                    style={{
                                      fontSize: "2px",
                                      verticalAlign: "middle",
                                    }}
                                  ></i>
                                )}
                              </span>
                            ))}
                          </div>
                          <hr className="mt-0" />
                        </>
                      )}
                      {languages && languages.length > 0 && (
                        <>
                          <div
                            className="text-inline-link"
                            id="div-movie-language"
                          >
                            <p>Language</p>
                            {languages.map((lang, index) => (
                              <span key={lang.language_id || index}>
                                <p
                                  style={{ fontWeight: 400, display: "inline" }}
                                >
                                  {lang.language_name}
                                </p>
                                {index < languages.length - 1 && (
                                  <i
                                    className="fas fa-circle pl-1 pr-1"
                                    style={{
                                      fontSize: "2px",
                                      verticalAlign: "middle",
                                      color: "rgb(239, 239, 239)",
                                    }}
                                  ></i>
                                )}
                              </span>
                            ))}
                          </div>
                          <hr className="mt-0" />
                        </>
                      )}
                      {locations && locations.length > 0 && (
                        <>
                          <div className="text-inline" id="div-movie-location">
                            <p>Filming locations</p>
                            <p style={{ fontWeight: 400 }}>
                              {locations
                                .map((loc) =>
                                  String(
                                    loc.location_name ||
                                      (loc as any).filminglocations_name ||
                                      "",
                                  ),
                                )
                                .join(", ")}
                            </p>
                          </div>
                          <hr className="mt-0" />
                        </>
                      )}
                      {companies && companies.length > 0 && (
                        <>
                          <div
                            className="text-inline-link"
                            id="div-movie-company"
                          >
                            <p>Production companies</p>
                            {companies.map((company, index) => (
                              <span
                                key={company.productioncompanies_id || index}
                              >
                                <a href="#">
                                  {String(
                                    company.company_name ||
                                      (company as any)
                                        .productioncompanies_name ||
                                      "",
                                  )}
                                </a>
                                {index < companies.length - 1 && (
                                  <i
                                    className="fas fa-circle pl-1 pr-1"
                                    style={{
                                      fontSize: "2px",
                                      verticalAlign: "middle",
                                    }}
                                  ></i>
                                )}
                              </span>
                            ))}
                          </div>
                          <hr className="mt-0" />
                        </>
                      )}
                    </div>
                  </div>

                  {boxOfficeData && (
                    <div className="box-office mt-4">
                      <a href="#">
                        <h3 className="topic mb-4 mt-2">
                          | Box office <i className="fas fa-chevron-right"></i>
                        </h3>
                      </a>

                      <div className="box-office-content">
                        <ul className="pl-0 mt-3">
                          <div className="row">
                            <div className="col-6">
                              {boxOfficeData.budget && (
                                <li>
                                  <h5>Budget</h5>
                                  <p id="p-movie-boxoffice-budget">
                                    {String(boxOfficeData.budget)}
                                  </p>
                                </li>
                              )}
                              <br />
                              {boxOfficeData.opening_weekend && (
                                <li>
                                  <h5>Opening weekend</h5>
                                  <p id="p-movie-boxoffice-opening">
                                    {String(boxOfficeData.opening_weekend)}
                                  </p>
                                </li>
                              )}
                            </div>
                            <div className="col-6">
                              {boxOfficeData.gross && (
                                <li>
                                  <h5>Gross</h5>
                                  <p id="p-movie-boxoffice-gross">
                                    {String(boxOfficeData.gross)}
                                  </p>
                                </li>
                              )}
                              <br />
                              {boxOfficeData.gross_worldwide && (
                                <li>
                                  <h5>Gross worldwide</h5>
                                  <p id="p-movie-boxoffice-gross-worldwide">
                                    {typeof boxOfficeData.gross_worldwide ===
                                      "string" &&
                                    boxOfficeData.gross_worldwide.startsWith(
                                      "$",
                                    )
                                      ? boxOfficeData.gross_worldwide
                                      : `$${boxOfficeData.gross_worldwide}`}
                                  </p>
                                </li>
                              )}
                            </div>
                          </div>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-4 content-right">
                  <div className="content-right-container">
                    <div className="content-right" id="content-right-id">
                      <h2 id="title-maybe-you-like">| Maybe you like</h2>

                      <div className="movie_maybe_like">
                        {recommendations && recommendations.length > 0 ? (
                          <div className="row mt-4">
                            {recommendations
                              .slice(0, 5)
                              .map((recMovie, idx) => (
                                <div
                                  key={String(
                                    recMovie.movie_id || recMovie.id || idx,
                                  )}
                                  className="col-12 mb-2"
                                >
                                  <Link
                                    href={`/detail?movie=${encodeURIComponent(recMovie.movie_name)}`}
                                    className="a-movie-maybe-like"
                                    onClick={() => {
                                      if (typeof window !== "undefined") {
                                        localStorage.setItem(
                                          "movie_name",
                                          recMovie.movie_name,
                                        );
                                      }
                                    }}
                                  >
                                    {recMovie.main_img && (
                                      <img
                                        src={recMovie.main_img as string}
                                        alt={recMovie.movie_name}
                                        className="img-movie-maybe-like"
                                        style={{
                                          width: "50px",
                                          height: "75px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    )}
                                    <div className="div-movie-maybe-like">
                                      <h6 className="name-search">
                                        {recMovie.movie_name}
                                      </h6>
                                      <p className="des">
                                        {String(
                                          recMovie.describe_movie || "",
                                        ).substring(0, 100)}
                                        ...
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div>No recommendations available</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar currentAccount={null} />
          <div className="div-container mt-4" style={{ paddingTop: "56px" }}>
            <div className="text-center">Loading...</div>
          </div>
        </>
      }
    >
      <DetailContent />
    </Suspense>
  );
}

export default DetailPage;
