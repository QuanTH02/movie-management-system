"use client";

import clsx from "clsx";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h3
      className={clsx(
        "text-xl font-bold text-dark-text mb-4",
        "flex items-center gap-2",
        className,
      )}
    >
      <span className="text-accent-yellow">|</span>
      {children}
      <i className="fas fa-chevron-right text-sm text-dark-text-secondary" />
    </h3>
  );
}

export default SectionTitle;
export type { SectionTitleProps };
