"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import Card from "@/app/components/common/Card";
import { useGetMovieDetail, useGetMovieRating } from "@/app/lib/api/hooks";
import { useI18n } from "@/app/lib/i18n";

function RatingContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Get movieName directly from searchParams to avoid hydration mismatch
  const movieParam = searchParams.get("movie");
  const movieName = movieParam ? decodeURIComponent(movieParam) : null;

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const account = localStorage.getItem("currentAccount");
      const token = sessionStorage.getItem("access_token");
      // Only set account if token exists (user is authenticated)
      if (token && account) {
        setCurrentAccount(account);
      } else {
        setCurrentAccount(null);
      }
    }
  }, []);

  const { data: movieResponse, isLoading: isLoadingMovie } =
    useGetMovieDetail(movieName);
  const { data: ratings, isLoading: isLoadingRatings } =
    useGetMovieRating(movieName);

  // Extract movie data from response
  const movie =
    movieResponse?.data || (Array.isArray(movieResponse) ? movieResponse : []);
  const movieData = movie && movie.length > 0 ? movie[0] : null;

  // Process rating data for charts
  const chartData = useMemo(() => {
    if (!ratings || ratings.length === 0) return [];

    // Sort ratings by number_of_stars (descending, 10 to 1)
    const sortedRatings = [...ratings].sort((a, b) => {
      const starA = parseInt(a.number_of_stars || "0");
      const starB = parseInt(b.number_of_stars || "0");
      return starB - starA;
    });

    return sortedRatings.map((rating) => {
      // Parse number of votes
      let voteNumber = 0;
      const voteString = rating.number_people_vote || "0";

      if (typeof voteString === "string") {
        if (voteString.includes("K") || voteString.includes("k")) {
          voteNumber = parseFloat(voteString.replace(/[Kk]/g, "")) * 1000;
        } else if (voteString.includes("M") || voteString.includes("m")) {
          voteNumber = parseFloat(voteString.replace(/[Mm]/g, "")) * 1000000;
        } else {
          voteNumber = parseFloat(voteString) || 0;
        }
      } else {
        voteNumber = typeof voteString === "number" ? voteString : 0;
      }

      // Parse percentage
      const percent = parseFloat(rating.percent_people_vote || "0") || 0;

      return {
        stars: rating.number_of_stars || "0",
        votes: voteNumber,
        percent: percent,
        label: `${rating.number_of_stars} stars`,
      };
    });
  }, [ratings]);

  // Color gradient for bars (from red to yellow to green)
  const getBarColor = (stars: string) => {
    const starNum = parseInt(stars) || 0;
    if (starNum <= 3) return "#ef4444"; // Red
    if (starNum <= 5) return "#f59e0b"; // Orange
    if (starNum <= 7) return "#eab308"; // Yellow
    if (starNum <= 9) return "#84cc16"; // Light green
    return "#22c55e"; // Green
  };

  if (!movieName) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-dark-text text-2xl font-bold mb-2">
                {t.detail.movieNameRequired}
              </h2>
              <p className="text-dark-text-secondary mb-4">
                {t.detail.provideMovieName}
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

  if (isLoadingMovie || isLoadingRatings) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                {t.pages.rating.loading}
              </p>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (!movieData || !movie || movie.length === 0) {
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
                {t.detail.checkMovieName}
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
          <div className="mb-6">
            <Link
              href={`/detail?movie=${encodeURIComponent(movieName || "")}`}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
            >
              {t.pages.rating.backToMovie}
            </Link>
          </div>

          <div className="flex items-start gap-6 mb-8">
            {movieData?.main_img && (
              <img
                src={movieData.main_img}
                alt={movieData?.movie_name || "Movie"}
                className="w-20 h-28 object-cover rounded-card"
              />
            )}
            <div className="flex-1">
              <Link
                href={`/detail?movie=${encodeURIComponent(movieName || "")}`}
                className="text-primary-600 hover:text-primary-700 transition-colors duration-hover"
              >
                <h1 className="text-3xl font-bold text-dark-text mb-2">
                  {movieData?.movie_name || movieName}
                </h1>
              </Link>
              <h2 className="text-2xl font-semibold text-dark-text mb-6">
                {t.pages.rating.ratingTitle}
              </h2>
            </div>
          </div>

          <Card className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h6 className="text-dark-text-secondary text-xs uppercase mb-2">
                  {t.pages.rating.ratingLabel}
                </h6>
                <div className="flex items-center gap-3">
                  <i className="fas fa-star text-yellow-500 text-2xl" />
                  <div>
                    <h4 className="text-dark-text text-2xl font-bold m-0">
                      {movieData?.rating || t.pages.rating.notAvailable}
                    </h4>
                    <p className="text-dark-text-secondary text-sm m-0">
                      {movieData?.total_vote || 0} {t.pages.rating.votes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {chartData && chartData.length > 0 ? (
            <Card className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-dark-text mb-2">
                  {t.pages.rating.ratingDistribution}
                </h3>
                <p className="text-dark-text-secondary text-sm">
                  {t.pages.rating.ratingDistributionDescription}
                </p>
              </div>
              <div className="w-full" style={{ height: "500px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 30, right: 40, left: 90, bottom: 60 }}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="stars"
                      tick={{
                        fill: "#e5e7eb",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                      tickLine={{ stroke: "#6b7280" }}
                      axisLine={{ stroke: "#6b7280" }}
                      label={{
                        value: t.pages.rating.starRating,
                        position: "insideBottom",
                        offset: -10,
                        style: {
                          fill: "#e5e7eb",
                          fontSize: 14,
                          fontWeight: 600,
                        },
                      }}
                    />
                    <YAxis
                      tick={(props: any) => {
                        const { x, y, payload } = props;
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#ffffff"
                            fontSize={14}
                            fontWeight={500}
                            textAnchor="end"
                            dy={4}
                          >
                            {payload.value.toLocaleString()}
                          </text>
                        );
                      }}
                      tickLine={{ stroke: "#6b7280" }}
                      axisLine={{ stroke: "#6b7280" }}
                      width={80}
                      label={{
                        value: t.pages.rating.numberOfVotes,
                        angle: -90,
                        position: "insideLeft",
                        offset: -10,
                        style: {
                          fill: "#ffffff",
                          color: "#ffffff",
                          fontSize: 14,
                          fontWeight: 600,
                        },
                      }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div
                              style={{
                                backgroundColor: "#1f2937",
                                border: "1px solid #374151",
                                borderRadius: "8px",
                                padding: "12px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              <p
                                style={{
                                  color: "#ffffff",
                                  fontWeight: 600,
                                  marginBottom: "4px",
                                  fontSize: "14px",
                                }}
                              >
                                {`${data.stars} ${t.pages.rating.stars}`}
                              </p>
                              <p
                                style={{
                                  color: "#ffffff",
                                  fontSize: "14px",
                                  margin: 0,
                                }}
                              >
                                {`${data.votes.toLocaleString()} ${t.pages.rating.votes} (${data.percent.toFixed(1)}%)`}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    />
                    <Legend
                      wrapperStyle={{
                        color: "#e5e7eb",
                        paddingTop: "20px",
                      }}
                      iconType="rect"
                      formatter={(value) => (
                        <span style={{ color: "#e5e7eb", fontSize: "14px" }}>
                          {value}
                        </span>
                      )}
                    />
                    <Bar
                      dataKey="votes"
                      name={t.pages.rating.numberOfVotes}
                      radius={[12, 12, 0, 0]}
                      animationDuration={1200}
                      animationEasing="ease-out"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getBarColor(entry.stars)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <p className="text-dark-text-secondary text-center">
                {t.pages.rating.noRatingData}
              </p>
            </Card>
          )}
        </Container>
      </div>
    </>
  );
}

function RatingPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <div className="bg-dark-bg pt-20 pb-16">
            <Container>
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              </div>
            </Container>
          </div>
        </>
      }
    >
      <RatingContent />
    </Suspense>
  );
}

export default RatingPage;
