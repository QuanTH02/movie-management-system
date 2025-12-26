"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

export interface TableColumn<T = unknown> {
  key: string;
  header: string | ReactNode;
  render?: (row: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableProps<T = unknown> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  hover?: boolean;
  striped?: boolean;
}

function Table<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  emptyMessage = "No data available",
  onRowClick,
  hover = false,
  striped = false,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div
        className={clsx(
          "w-full bg-dark-card rounded-card p-8 text-center",
          className,
        )}
      >
        <p className="text-dark-text-secondary">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={clsx("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-dark-border">
            {columns.map((column) => (
              <th
                key={column.key}
                className={clsx(
                  "px-4 py-3 text-left text-sm font-semibold text-dark-text",
                  "bg-dark-surface",
                )}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row, rowIndex)}
              className={clsx(
                "border-b border-dark-border transition-colors duration-hover",
                {
                  "hover:bg-dark-card-hover cursor-pointer":
                    hover || onRowClick,
                  "bg-dark-card": !striped || rowIndex % 2 === 0,
                  "bg-dark-surface": striped && rowIndex % 2 === 1,
                },
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3 text-sm text-dark-text"
                >
                  {column.render
                    ? column.render(row, rowIndex)
                    : String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
export type { TableProps };
