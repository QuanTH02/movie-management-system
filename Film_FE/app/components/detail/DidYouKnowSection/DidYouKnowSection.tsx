"use client";

import SectionTitle from "../SectionTitle";
import Card from "@/app/components/common/Card";

interface DidYouKnowItem {
  didyouknow_id?: number;
  name?: string;
  content?: string;
  trivia?: string;
  goofs?: string;
  quotes?: string;
}

interface DidYouKnowSectionProps {
  items?: DidYouKnowItem[];
}

function DidYouKnowSection({ items }: DidYouKnowSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      <SectionTitle>Did you know</SectionTitle>
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={item.didyouknow_id || index} className="p-4">
            <h5 className="text-dark-text font-semibold mb-2">
              {item.name ||
                (item.trivia
                  ? "Trivia"
                  : item.goofs
                    ? "Goofs"
                    : item.quotes
                      ? "Quotes"
                      : "Fact")}
            </h5>
            <p className="text-dark-text-secondary">
              {item.content || item.trivia || item.goofs || item.quotes || ""}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DidYouKnowSection;
export type { DidYouKnowSectionProps };
