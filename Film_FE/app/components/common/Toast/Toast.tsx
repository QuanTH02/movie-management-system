"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import type { Toast as ToastType } from "./ToastContext";

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

function Toast({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "fa-check-circle";
      case "error":
        return "fa-exclamation-circle";
      case "warning":
        return "fa-exclamation-triangle";
      case "info":
        return "fa-info-circle";
      default:
        return "fa-info-circle";
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return {
          bg: "bg-[#10b981]/10",
          border: "border-[#10b981]/30",
          text: "text-[#10b981]",
          icon: "text-[#10b981]",
        };
      case "error":
        return {
          bg: "bg-[#ef4444]/10",
          border: "border-[#ef4444]/30",
          text: "text-[#ef4444]",
          icon: "text-[#ef4444]",
        };
      case "warning":
        return {
          bg: "bg-[#f59e0b]/10",
          border: "border-[#f59e0b]/30",
          text: "text-[#f59e0b]",
          icon: "text-[#f59e0b]",
        };
      case "info":
        return {
          bg: "bg-[#3b82f6]/10",
          border: "border-[#3b82f6]/30",
          text: "text-[#3b82f6]",
          icon: "text-[#3b82f6]",
        };
      default:
        return {
          bg: "bg-dark-card",
          border: "border-dark-border",
          text: "text-dark-text",
          icon: "text-dark-text-secondary",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={clsx(
        "p-4 rounded-card border shadow-lg backdrop-blur-sm",
        styles.bg,
        styles.border,
        "flex items-start gap-3",
      )}
      role="alert"
      style={{
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <i className={clsx("fas", getIcon(), "text-lg", styles.icon)} />
      <div className="flex-1 min-w-0">
        <p className={clsx("text-sm font-medium", styles.text)}>
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className={clsx(
          "flex-shrink-0 text-dark-text-secondary hover:text-dark-text",
          "transition-colors duration-hover",
        )}
        aria-label="Close"
      >
        <i className="fas fa-times text-sm" />
      </button>
    </div>
  );
}

export default Toast;
