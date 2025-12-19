"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-dark-card rounded-card shadow-card",
        "transition-all duration-hover",
        {
          "hover:bg-dark-card-hover hover:shadow-card-hover cursor-pointer":
            hover || onClick,
        },
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
}

export default Card;
export type { CardProps };
