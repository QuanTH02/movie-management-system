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
          bg: "bg-success-DEFAULT/10",
          border: "border-success-DEFAULT/30",
          text: "text-success-DEFAULT",
          icon: "text-success-DEFAULT",
        };
      case "error":
        return {
          bg: "bg-error-DEFAULT/10",
          border: "border-error-DEFAULT/30",
          text: "text-error-DEFAULT",
          icon: "text-error-DEFAULT",
        };
      case "warning":
        return {
          bg: "bg-warning-DEFAULT/10",
          border: "border-warning-DEFAULT/30",
          text: "text-warning-DEFAULT",
          icon: "text-warning-DEFAULT",
        };
      case "info":
        return {
          bg: "bg-primary-600/10",
          border: "border-primary-600/30",
          text: "text-primary-600",
          icon: "text-primary-600",
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
