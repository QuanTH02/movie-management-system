"use client";

import Link from "next/link";
import { useI18n } from "@/app/lib/i18n";
import SectionTitle from "../SectionTitle";
import Card from "@/app/components/common/Card";
import Button from "@/app/components/common/Button";

interface Review {
  film_review_id?: number;
  name_review: string;
  star_review: number;
  content_review: string;
  like_count?: number;
  dislike_count?: number;
}

interface UserReviewsSectionProps {
  reviews?: Review[];
  movieName: string | null;
}

function UserReviewsSection({ reviews, movieName }: UserReviewsSectionProps) {
  const { t } = useI18n();
  if (!reviews || reviews.length === 0) return null;

  const topReviews = reviews.slice(0, 3);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <SectionTitle>{t.detail.userReviews}</SectionTitle>
        <Link
          href={`/user-review?movie=${encodeURIComponent(movieName || "")}`}
        >
          <Button variant="outline" size="sm">
            <i className="fa-solid fa-plus mr-2" />
            {t.detail.addReview}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {topReviews.map((review, index) => (
          <Card key={review.film_review_id || index} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-dark-text font-semibold text-lg">
                {review.name_review}
              </h5>
              <div className="flex items-center gap-1">
                <i className="fas fa-star text-rating-DEFAULT text-sm" />
                <span className="text-dark-text font-semibold">
                  {review.star_review}
                </span>
              </div>
            </div>
            <p className="text-dark-text-secondary mb-4">
              {review.content_review}
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-dark-text-secondary hover:text-success-DEFAULT transition-colors duration-hover">
                <i className="fa-regular fa-thumbs-up" />
                <span>{review.like_count || 0}</span>
              </button>
              <button className="flex items-center gap-2 text-dark-text-secondary hover:text-error-DEFAULT transition-colors duration-hover">
                <i className="fa-regular fa-thumbs-down" />
                <span>{review.dislike_count || 0}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserReviewsSection;
export type { UserReviewsSectionProps };
