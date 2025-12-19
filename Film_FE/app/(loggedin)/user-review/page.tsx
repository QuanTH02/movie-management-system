"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import Card from "@/app/components/common/Card";
import { useGetMovieReviews } from "@/app/lib/api/hooks";

function UserReviewContent() {
  const searchParams = useSearchParams();
  const [movieName, setMovieName] = useState<string | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
      const movie = searchParams.get("movie");
      if (movie) {
        setMovieName(decodeURIComponent(movie));
      }
    }
  }, [searchParams]);

  const { data: reviews, isLoading } = useGetMovieReviews(movieName);

  if (!movieName) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-dark-text text-2xl font-bold mb-2">
                Movie name required
              </h2>
              <p className="text-dark-text-secondary mb-4">
                Please provide a movie name in the URL.
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

  if (isLoading) {
    return (
      <>
        <Navbar currentAccount={currentAccount} />
        <div className="bg-dark-bg pt-20 pb-16">
          <Container>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-dark-text-secondary">
                Loading reviews...
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
          <div className="mb-6">
            <Link
              href={`/detail?movie=${encodeURIComponent(movieName)}`}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-hover font-semibold"
            >
              ← Back to Movie
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-dark-text mb-8">
            User Reviews: {movieName}
          </h1>

          {reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.film_review_id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-dark-text mb-2">
                        {review.title_review}
                      </h3>
                      <p className="text-dark-text-secondary text-sm">
                        by {review.name_review}
                        {review.date_review && (
                          <span className="ml-2">• {review.date_review}</span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${
                            i < review.star_review
                              ? "text-rating-DEFAULT"
                              : "text-dark-text-muted"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-dark-text font-semibold">
                        {review.star_review}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-dark-text-secondary leading-relaxed">
                    {review.content_review}
                  </p>
                  {(review.like_count !== undefined ||
                    review.dislike_count !== undefined) && (
                    <div className="flex gap-4 mt-4 pt-4 border-t border-dark-border">
                      {review.like_count !== undefined && (
                        <button className="flex items-center gap-2 text-dark-text-secondary hover:text-success-DEFAULT transition-colors duration-hover">
                          <i className="fas fa-thumbs-up" />
                          <span>{review.like_count}</span>
                        </button>
                      )}
                      {review.dislike_count !== undefined && (
                        <button className="flex items-center gap-2 text-dark-text-secondary hover:text-error-DEFAULT transition-colors duration-hover">
                          <i className="fas fa-thumbs-down" />
                          <span>{review.dislike_count}</span>
                        </button>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-dark-text-secondary text-lg">
                No reviews available for this movie yet.
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

function UserReviewPage() {
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
      <UserReviewContent />
    </Suspense>
  );
}

export default UserReviewPage;
