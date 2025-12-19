"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

function Container({ children, className, maxWidth = "full" }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-container": maxWidth === "full",
          "max-w-screen-sm": maxWidth === "sm",
          "max-w-screen-md": maxWidth === "md",
          "max-w-screen-lg": maxWidth === "lg",
          "max-w-screen-xl": maxWidth === "xl",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
export type { ContainerProps };
