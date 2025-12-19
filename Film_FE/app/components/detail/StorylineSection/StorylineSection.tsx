"use client";

import Link from "next/link";
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
  return (
    <div className="mb-8">
      <SectionTitle>Storyline</SectionTitle>
      <div className="space-y-4">
        {storyline && (
          <p className="text-dark-text-secondary text-base leading-relaxed">
            {storyline}
          </p>
        )}

        {taglines && taglines.length > 0 && (
          <div>
            <p className="text-dark-text font-semibold mb-2">Taglines</p>
            <p className="text-dark-text-secondary">
              {String(
                taglines[0].taglines_content || taglines[0].tagline || "",
              )}
            </p>
          </div>
        )}

        {genres && genres.length > 0 && (
          <div>
            <p className="text-dark-text font-semibold mb-2">Genres</p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre, index) => (
                <Link
                  key={genre.genres_id || index}
                  href={`/search?genre=${encodeURIComponent(genre.genres_name)}`}
                  className="px-3 py-1 rounded-badge border border-dark-border text-link-DEFAULT hover:bg-dark-card-hover hover:border-primary-500 transition-colors duration-hover text-sm"
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
