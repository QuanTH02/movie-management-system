"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/app/lib/i18n";
import { useTrackActivity } from "@/app/lib/api/hooks";
import type { Movie } from "@/types/api.types";

interface MovieMediaProps {
  movie: Movie;
  mainTrailer: string;
  movieName: string | null;
}

function MovieMedia({ movie, mainTrailer, movieName }: MovieMediaProps) {
  const { t } = useI18n();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const { trigger: trackActivity } = useTrackActivity();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
    }
  }, []);

  const handleVideoPlay = () => {
    if (currentAccount && movieName) {
      trackActivity({ movieName, activityType: "VIEW_TRAILER" });
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      {/* Movie Poster */}
      <div className="col-span-12 md:col-span-3 relative">
        <div className="absolute top-2 right-2 z-10 cursor-pointer hover:opacity-80 transition-opacity duration-hover">
          <svg
            width="24px"
            height="34px"
            viewBox="0 0 24 34"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <polygon
              fill="transparent"
              points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
            />
            <polygon
              fill="rgba(255,255,255,0.1)"
              points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="24"
              fill="#888888"
              className="hover:fill-dark-text transition-colors duration-hover"
            >
              +
            </text>
          </svg>
        </div>
        {movie.main_img && (
          <img
            src={movie.main_img as string}
            alt={movie.movie_name}
            className="w-full h-auto rounded-card"
          />
        )}
      </div>

      {/* Trailer */}
      <div className="col-span-12 md:col-span-7">
        {mainTrailer && (
          <video
            controls
            className="w-full h-auto rounded-card"
            onPlay={handleVideoPlay}
          >
            <source src={mainTrailer} type="video/mp4" />
            {t.detail.videoNotSupported}
          </video>
        )}
      </div>

      {/* Action Buttons */}
      <div className="col-span-12 md:col-span-2 flex flex-col gap-2">
        <button className="flex flex-col items-center justify-center p-4 rounded-card bg-gradient-to-br from-white/10 to-dark-border hover:opacity-90 transition-opacity duration-hover">
          <i className="fa-solid fa-play text-2xl text-dark-text-secondary mb-2" />
          <span className="text-dark-text-secondary">{t.detail.video}</span>
        </button>
        <Link
          href={`/img?movie=${encodeURIComponent(movieName || "")}`}
          className="flex flex-col items-center justify-center p-4 rounded-card bg-gradient-to-br from-white/10 to-dark-border hover:opacity-90 transition-opacity duration-hover"
        >
          <i className="fa-solid fa-image text-2xl text-dark-text-secondary mb-2" />
          <span className="text-dark-text-secondary">{t.detail.image}</span>
        </Link>
      </div>
    </div>
  );
}

export default MovieMedia;
export type { MovieMediaProps };
