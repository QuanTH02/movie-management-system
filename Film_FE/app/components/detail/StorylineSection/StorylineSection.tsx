"use client";

import Link from "next/link";
import { useI18n } from "@/app/lib/i18n";
import SectionTitle from "../SectionTitle";

interface Genre {
  genres_id?: number;
  genres_name: string;
}

interface Tagline {
  taglines_content?: string;
  tagline?: string;
}

interface StorylineSectionProps {
  storyline?: string;
  taglines?: Tagline[];
  genres?: Genre[];
}

function StorylineSection({
  storyline,
  taglines,
  genres,
}: StorylineSectionProps) {
  const { t } = useI18n();
  return (
    <div className="mb-8">
      <SectionTitle>{t.detail.storyline}</SectionTitle>
      <div className="space-y-4">
        {storyline && (
          <p className="text-dark-text-secondary text-base leading-relaxed">
            {storyline}
          </p>
        )}

        {taglines && taglines.length > 0 && (
          <div>
            <p className="text-dark-text font-semibold mb-2">
              {t.detail.taglines}
            </p>
            <p className="text-dark-text-secondary">
              {String(
                taglines[0].taglines_content || taglines[0].tagline || "",
              )}
            </p>
          </div>
        )}

        {genres && genres.length > 0 && (
          <div>
            <p className="text-dark-text font-semibold mb-2">
              {t.detail.genres}
            </p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre, index) => (
                <Link
                  key={genre.genres_id || index}
                  href={`/search?genre=${encodeURIComponent(genre.genres_name)}`}
                  className="px-3 py-1 rounded-badge border border-dark-border text-link hover:bg-dark-card-hover hover:border-primary-500 hover:text-link-hover transition-colors duration-hover text-sm"
                >
                  {genre.genres_name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StorylineSection;
export type { StorylineSectionProps };
