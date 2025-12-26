"use client";

export default function useApi() {
  const fetcher = async (url: string, options?: RequestInit) => {
    // Normalize URL: remove leading slash
    let cleanUrl = url.startsWith("/") ? url.slice(1) : url;

    // Split URL and query string to handle trailing slash correctly
    const [path, queryString] = cleanUrl.split("?");

    // Ensure trailing slash is present on path only (not on query string) - Django requires it
    const normalizedPath = path.endsWith("/") ? path : `${path}/`;

    // Reconstruct URL with query string if present
    cleanUrl = queryString
      ? `${normalizedPath}?${queryString}`
      : normalizedPath;

    // Use environment variable for backend URL
    // MUST be absolute URL - never use relative paths
    // In browser, always use localhost:8000 (backend is exposed on host)
    const backendBaseUrl =
      (typeof window !== "undefined" && process.env.NEXT_PUBLIC_BACKEND_URL) ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "http://localhost:8000";

    // Ensure we always have an absolute URL
    const apiUrl = `${backendBaseUrl}/api/${cleanUrl}`;

    // Validate that we have an absolute URL
    if (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://")) {
      throw new Error(
        `Invalid API URL: ${apiUrl}. Must be an absolute URL starting with http:// or https://`,
      );
    }

    try {
      // Get JWT token from sessionStorage (client-side only)
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("access_token")
          : null;

      // Call backend directly - no Next.js proxy
      const response = await fetch(apiUrl, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options?.headers,
        },
        credentials: "include",
        redirect: "follow",
      });

      // Handle empty response (204 No Content)
      if (response.status === 204) {
        return null;
      }

      // Try to parse JSON response
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (e) {
          // If JSON parsing fails, treat as error
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
      } else {
        // Non-JSON response
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return null;
      }

      // Check if response is ok after parsing
      if (!response.ok) {
        const errorMessage =
          data?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  };

  return { fetcher };
}
