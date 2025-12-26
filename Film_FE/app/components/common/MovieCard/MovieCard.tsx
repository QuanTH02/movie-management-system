"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/app/lib/i18n";
import { useTrackActivity } from "@/app/lib/api/hooks";
import Card from "../Card";
import Button from "../Button";
import type { Movie } from "@/types/api.types";

interface MovieCardProps {
  movie: Movie;
  onAddToList?: (movieName: string) => void;
}

function MovieCard({ movie, onAddToList }: MovieCardProps) {
  const { t } = useI18n();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const { trigger: trackActivity } = useTrackActivity();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
    }
  }, []);

  const handleCardClick = () => {
    if (currentAccount && movie.movie_name) {
      trackActivity({
        movieName: movie.movie_name,
        activityType: "CLICK_CARD",
      });
    }
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToList) {
      onAddToList(movie.movie_name);
    }
  };

  const rating =
    movie.rating && String(movie.rating).includes("/")
      ? String(movie.rating).split("/")[0]
      : movie.movie_rating || movie.rating || t.detail.notAvailable;

  const detailUrl = `/detail?movie=${encodeURIComponent(movie.movie_name)}`;

  return (
    <Link href={detailUrl} className="group block" onClick={handleCardClick}>
      <Card
        hover
        className="h-full flex flex-col overflow-hidden transform transition-all duration-hover group-hover:scale-105"
      >
        {/* Image */}
        <div className="relative w-full pt-[150%] bg-dark-surface overflow-hidden">
          {movie.main_img ? (
            <img
              src={movie.main_img as string}
              alt={movie.movie_name}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-hover group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-dark-card">
              <i className="fas fa-image text-4xl text-dark-text-secondary" />
            </div>
          )}
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-dark-bg/80 backdrop-blur-sm px-2 py-1 rounded-badge flex items-center gap-1">
            <i className="fas fa-star text-rating-DEFAULT text-sm" />
            <span className="text-dark-text text-sm font-semibold">
              {rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h6 className="text-dark-text font-semibold text-base mb-3 line-clamp-2 min-h-[3rem]">
            {movie.movie_name}
          </h6>

          <div className="mt-auto flex flex-col gap-2">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToList(e);
              }}
            >
              <i className="fas fa-plus mr-2" />
              {t.detail.addToList}
            </Button>
            <Link href={detailUrl}>
              <Button
                variant="success"
                size="sm"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <i className="fa fa-play mr-2" />
                {t.detail.watch}
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default MovieCard;
export type { MovieCardProps };
