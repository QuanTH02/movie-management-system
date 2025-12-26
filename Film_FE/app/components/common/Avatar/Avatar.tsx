"use client";

import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string | ReactNode;
  shape?: "circle" | "square";
  online?: boolean;
}

function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  fallback,
  shape = "circle",
  online,
  className,
  ...props
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderContent = () => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt}
          className={clsx("w-full h-full object-cover", {
            "rounded-full": shape === "circle",
            "rounded-button": shape === "square",
          })}
        />
      );
    }

    if (fallback) {
      if (typeof fallback === "string") {
        return (
          <span className="font-semibold text-dark-text">
            {getInitials(fallback)}
          </span>
        );
      }
      return fallback;
    }

    return (
      <svg
        className="w-full h-full text-dark-text-secondary"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center",
        "bg-dark-surface border border-dark-border",
        "overflow-hidden",
        sizeClasses[size],
        {
          "rounded-full": shape === "circle",
          "rounded-button": shape === "square",
        },
        className,
      )}
      {...props}
    >
      {renderContent()}
      {online !== undefined && (
        <span
          className={clsx(
            "absolute bottom-0 right-0 rounded-full border-2 border-dark-card",
            {
              "w-3 h-3": size === "sm" || size === "md",
              "w-4 h-4": size === "lg" || size === "xl",
              "bg-success-DEFAULT": online,
              "bg-dark-border": !online,
            },
          )}
        />
      )}
    </div>
  );
}

export default Avatar;
export type { AvatarProps };
