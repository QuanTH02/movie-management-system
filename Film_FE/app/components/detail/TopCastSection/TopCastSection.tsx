"use client";

import { useI18n } from "@/app/lib/i18n";
import SectionTitle from "../SectionTitle";

interface Cast {
  cast_id?: number;
  name: string;
  character_name?: string;
  role?: string;
}

interface TopCastSectionProps {
  cast: Cast[];
}

function TopCastSection({ cast }: TopCastSectionProps) {
  const { t } = useI18n();
  if (!cast || cast.length === 0) return null;

  const topCast = cast.slice(0, 10);

  return (
    <div className="mb-8">
      <SectionTitle>{t.detail.topCast}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topCast.map((actor, index) => (
          <div
            key={actor.cast_id || index}
            className="flex items-start gap-4 pl-4 border-l-2 border-primary-500"
          >
            <div className="flex-1">
              <h5 className="text-dark-text font-semibold mb-1">
                {actor.name}
              </h5>
              <p className="text-dark-text-secondary text-sm">
                {String(actor.character_name || actor.role || t.detail.actor)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCastSection;
export type { TopCastSectionProps };
