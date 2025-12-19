"use client";

import { useI18n } from "@/app/lib/i18n";
import SectionTitle from "../SectionTitle";
import Card from "@/app/components/common/Card";

interface BoxOfficeData {
  budget?: string;
  opening_weekend?: string;
  gross?: string;
  gross_worldwide?: string;
}

interface BoxOfficeSectionProps {
  boxOffice?: BoxOfficeData;
}

function BoxOfficeSection({ boxOffice }: BoxOfficeSectionProps) {
  const { t } = useI18n();
  if (!boxOffice) return null;

  return (
    <div className="mb-8">
      <SectionTitle>{t.detail.boxOffice}</SectionTitle>
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boxOffice.budget && (
            <div>
              <h5 className="text-dark-text font-semibold mb-2">
                {t.detail.budget}
              </h5>
              <p className="text-dark-text-secondary">{boxOffice.budget}</p>
            </div>
          )}
          {boxOffice.opening_weekend && (
            <div>
              <h5 className="text-dark-text font-semibold mb-2">
                {t.detail.openingWeekend}
              </h5>
              <p className="text-dark-text-secondary">
                {boxOffice.opening_weekend}
              </p>
            </div>
          )}
          {boxOffice.gross && (
            <div>
              <h5 className="text-dark-text font-semibold mb-2">
                {t.detail.gross}
              </h5>
              <p className="text-dark-text-secondary">{boxOffice.gross}</p>
            </div>
          )}
          {boxOffice.gross_worldwide && (
            <div>
              <h5 className="text-dark-text font-semibold mb-2">
                {t.detail.grossWorldwide}
              </h5>
              <p className="text-dark-text-secondary">
                {typeof boxOffice.gross_worldwide === "string" &&
                boxOffice.gross_worldwide.startsWith("$")
                  ? boxOffice.gross_worldwide
                  : `$${boxOffice.gross_worldwide}`}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default BoxOfficeSection;
export type { BoxOfficeSectionProps };
