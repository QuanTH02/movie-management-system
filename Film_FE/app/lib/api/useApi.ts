'use client';

export default function useApi() {
  const fetcher = async (url: string, options?: RequestInit) => {
    // Normalize URL: remove leading slash
    let cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    // Ensure trailing slash is present - Django requires it
    cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
    
    // Call backend directly at http://localhost:8000/api/
    const backendUrl = 'http://localhost:8000/api';
    const apiUrl = `${backendUrl}/${cleanUrl}`;

    try {
      // Call backend directly - no Next.js proxy
      const response = await fetch(apiUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        credentials: 'include',
        redirect: 'follow',
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        const errorMessage = error.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw error;
    }
  };

  return { fetcher };
}
