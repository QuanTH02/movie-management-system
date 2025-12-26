"use client";

import Link from "next/link";
import { useI18n } from "@/app/lib/i18n";
import Card from "@/app/components/common/Card";
import type { Movie } from "@/types/api.types";
import {
  RECOMMENDATIONS_DISPLAY_COUNT,
  MOVIE_DESCRIPTION_PREVIEW_LENGTH,
} from "@/app/lib/constants/ui";

interface RecommendationsSidebarProps {
  recommendations?: Movie[];
}

function RecommendationsSidebar({
  recommendations,
}: RecommendationsSidebarProps) {
  const { t } = useI18n();
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-dark-card rounded-card p-6">
        <h2 className="text-xl font-bold text-dark-text mb-4">
          | {t.detail.maybeYouLike}
        </h2>
        <p className="text-dark-text-secondary">{t.detail.noRecommendations}</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-card rounded-card p-6">
      <h2 className="text-xl font-bold text-dark-text mb-4">
        | {t.detail.maybeYouLike}
      </h2>
      <div className="space-y-4">
        {recommendations
          .slice(0, RECOMMENDATIONS_DISPLAY_COUNT)
          .map((recMovie, idx) => {
            const detailUrl = `/detail?movie=${encodeURIComponent(recMovie.movie_name)}`;
            return (
              <Link
                key={String(recMovie.movie_id || recMovie.id || idx)}
                href={detailUrl}
              >
                <Card hover className="p-3">
                  <div className="flex gap-3">
                    {recMovie.main_img && (
                      <img
                        src={recMovie.main_img as string}
                        alt={recMovie.movie_name}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h6 className="text-dark-text font-semibold mb-1 line-clamp-1">
                        {recMovie.movie_name}
                      </h6>
                      <p className="text-dark-text-secondary text-sm line-clamp-2">
                        {String(recMovie.describe_movie || "").substring(
                          0,
                          MOVIE_DESCRIPTION_PREVIEW_LENGTH,
                        )}
                        ...
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default RecommendationsSidebar;
export type { RecommendationsSidebarProps };
