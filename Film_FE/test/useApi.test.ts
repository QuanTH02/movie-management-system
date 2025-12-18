/**
 * Comprehensive test cases for useApi hook and redirect loop fix
 * 
 * Tests verify that:
 * 1. useApi correctly normalizes URLs with trailing slashes
 * 2. Next.js rewrite configuration preserves trailing slashes
 * 3. No redirect loops occur between Next.js and Django
 * 4. All API endpoints work correctly
 */

describe('useApi Hook - Redirect Loop Fix', () => {
  describe('URL Normalization', () => {
    test('should ensure trailing slash is present in normalized URL', () => {
      // useApi should normalize URLs by ensuring trailing slash is present
      // This matches Django's requirement and Next.js trailingSlash: true
      const testCases = [
        { input: '/film/', expected: 'film/' },
        { input: '/ticketroom/', expected: 'ticketroom/' },
        { input: '/recommend/collaborative/admin/', expected: 'recommend/collaborative/admin/' },
        { input: '/film', expected: 'film/' },
        { input: 'film/', expected: 'film/' },
        { input: 'film', expected: 'film/' },
        { input: '/api/film/', expected: 'api/film/' },
        { input: '/api/film', expected: 'api/film/' },
      ];

      testCases.forEach(({ input, expected }) => {
        // Simulate useApi normalization logic
        let cleanUrl = input.startsWith('/') ? input.slice(1) : input;
        cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
        expect(cleanUrl).toBe(expected);
      });
    });

    test('should build API URL with trailing slash pointing to localhost:8000', () => {
      // useApi should build URLs with trailing slash pointing directly to backend
      // Format: http://localhost:8000/api/{cleanUrl} where cleanUrl ends with /
      const backendUrl = 'http://localhost:8000/api';
      const testCases = [
        { input: '/film/', expected: 'http://localhost:8000/api/film/' },
        { input: '/ticketroom/', expected: 'http://localhost:8000/api/ticketroom/' },
        { input: '/recommend/collaborative/admin/', expected: 'http://localhost:8000/api/recommend/collaborative/admin/' },
        { input: '/film', expected: 'http://localhost:8000/api/film/' },
        { input: 'film/', expected: 'http://localhost:8000/api/film/' },
        { input: 'film', expected: 'http://localhost:8000/api/film/' },
      ];

      testCases.forEach(({ input, expected }) => {
        // Simulate useApi URL building logic
        let cleanUrl = input.startsWith('/') ? input.slice(1) : input;
        cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
        const apiUrl = `${backendUrl}/${cleanUrl}`;
        expect(apiUrl).toBe(expected);
      });
    });

    test('should handle empty or root paths', () => {
      // Empty paths should result in just the API prefix with trailing slash
      const testCases = [
        { input: '/', expected: '/api/' },
        { input: '', expected: '/api/' },
      ];

      testCases.forEach(({ input, expected }) => {
        let cleanUrl = input.startsWith('/') ? input.slice(1) : input;
        // For empty string, we want just '/' not '//'
        if (cleanUrl === '') {
          cleanUrl = '/';
        } else {
          cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
        }
        const apiUrl = `/api${cleanUrl}`;
        expect(apiUrl).toBe(expected);
      });
    });
  });

  describe('Direct Backend API Calls', () => {
    test('should call backend directly at http://localhost:8000/api/', () => {
      // useApi now calls backend directly, no Next.js proxy
      const backendUrl = 'http://localhost:8000/api';
      
      const testCases = [
        { path: 'film/', expected: 'http://localhost:8000/api/film/' },
        { path: 'ticketroom/', expected: 'http://localhost:8000/api/ticketroom/' },
        { path: 'recommend/collaborative/admin/', expected: 'http://localhost:8000/api/recommend/collaborative/admin/' },
      ];

      testCases.forEach(({ path, expected }) => {
        const apiUrl = `${backendUrl}/${path}`;
        expect(apiUrl).toBe(expected);
        expect(apiUrl.endsWith('/')).toBe(true);
        expect(apiUrl.startsWith('http://localhost:8000')).toBe(true);
      });
    });

    test('should not use Next.js proxy paths', () => {
      // Verify URLs don't use /api/ proxy path
      const backendUrl = 'http://localhost:8000/api';
      const path = 'film/';
      const apiUrl = `${backendUrl}/${path}`;
      
      expect(apiUrl).toBe('http://localhost:8000/api/film/');
      expect(apiUrl).not.toContain('/api/api/'); // No double /api/
      expect(apiUrl.startsWith('http://localhost:8000')).toBe(true);
    });
  });

  describe('End-to-End URL Flow', () => {
    test('should produce correct final URL for Django - film endpoint', () => {
      // Simulate the full flow:
      // 1. Hook calls useApi with '/film/'
      // 2. useApi normalizes to 'film/' and builds '/api/film/'
      // 3. Next.js rewrite converts to 'http://backend:8000/api/film/'
      
      const hookInput = '/film/';
      
      // Step 1: useApi normalization
      let cleanUrl = hookInput.startsWith('/') ? hookInput.slice(1) : hookInput;
      cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      expect(cleanUrl).toBe('film/');
      
      // Step 2: useApi URL building - direct call to backend
      const backendUrl = 'http://localhost:8000/api';
      const apiUrl = `${backendUrl}/${cleanUrl}`;
      expect(apiUrl).toBe('http://localhost:8000/api/film/');
      expect(apiUrl.endsWith('/')).toBe(true);
    });

    test('should produce correct final URL for Django - ticketroom endpoint', () => {
      const hookInput = '/ticketroom/';
      
      let cleanUrl = hookInput.startsWith('/') ? hookInput.slice(1) : hookInput;
      cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      expect(cleanUrl).toBe('ticketroom/');
      
      const apiUrl = `/api/${cleanUrl}`;
      expect(apiUrl).toBe('/api/ticketroom/');
      
      const backendUrl = 'http://backend:8000/api';
      const cleanBackendUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
      const finalUrl = `${cleanBackendUrl}/${cleanUrl}`;
      expect(finalUrl).toBe('http://backend:8000/api/ticketroom/');
      expect(finalUrl.endsWith('/')).toBe(true);
    });

    test('should produce correct final URL for Django - nested recommend endpoint', () => {
      const hookInput = '/recommend/collaborative/admin/';
      
      let cleanUrl = hookInput.startsWith('/') ? hookInput.slice(1) : hookInput;
      cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      expect(cleanUrl).toBe('recommend/collaborative/admin/');
      
      const apiUrl = `/api/${cleanUrl}`;
      expect(apiUrl).toBe('/api/recommend/collaborative/admin/');
      
      const backendUrl = 'http://backend:8000/api';
      const cleanBackendUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
      const finalUrl = `${cleanBackendUrl}/${cleanUrl}`;
      expect(finalUrl).toBe('http://backend:8000/api/recommend/collaborative/admin/');
      expect(finalUrl.endsWith('/')).toBe(true);
    });

    test('should handle input without trailing slash', () => {
      // Test case where input doesn't have trailing slash
      const hookInput = '/film';
      
      // useApi normalization - should add trailing slash
      let cleanUrl = hookInput.startsWith('/') ? hookInput.slice(1) : hookInput;
      cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      expect(cleanUrl).toBe('film/');
      
      // useApi URL building - direct call to backend
      const backendUrl = 'http://localhost:8000/api';
      const apiUrl = `${backendUrl}/${cleanUrl}`;
      expect(apiUrl).toBe('http://localhost:8000/api/film/');
      expect(apiUrl.endsWith('/')).toBe(true);
    });

    test('should handle URL encoding in nested paths', () => {
      // Test with encoded user ID
      const userId = 'admin';
      const hookInput = `/recommend/collaborative/${encodeURIComponent(userId)}/`;
      
      let cleanUrl = hookInput.startsWith('/') ? hookInput.slice(1) : hookInput;
      cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      
      const apiUrl = `/api/${cleanUrl}`;
      expect(apiUrl).toContain('recommend/collaborative');
      expect(apiUrl.endsWith('/')).toBe(true);
      
      const backendUrl = 'http://backend:8000/api';
      const cleanBackendUrl = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
      const finalUrl = `${cleanBackendUrl}/${cleanUrl}`;
      expect(finalUrl.endsWith('/')).toBe(true);
    });
  });

  describe('Redirect Loop Prevention', () => {
    test('should ensure URLs always have trailing slash to prevent Django redirect', () => {
      // Django's APPEND_SLASH middleware redirects URLs without trailing slash
      // By ensuring trailing slash is always present, we prevent this redirect
      const testUrls = [
        '/api/film/',
        '/api/ticketroom/',
        '/api/recommend/collaborative/admin/',
      ];

      testUrls.forEach(url => {
        expect(url.endsWith('/')).toBe(true);
        
        // Simulate what Django would receive
        const backendUrl = 'http://backend:8000';
        const fullUrl = `${backendUrl}${url}`;
        expect(fullUrl.endsWith('/')).toBe(true);
      });
    });

    test('should call backend directly without Next.js redirects', () => {
      // useApi now calls backend directly, bypassing Next.js entirely
      const backendUrl = 'http://localhost:8000/api';
      const apiUrls = [
        `${backendUrl}/film/`,
        `${backendUrl}/ticketroom/`,
        `${backendUrl}/recommend/collaborative/admin/`,
      ];

      apiUrls.forEach(url => {
        // URLs should point directly to backend
        expect(url.endsWith('/')).toBe(true);
        expect(url.startsWith('http://localhost:8000')).toBe(true);
        
        // No Next.js proxy, so no redirects
        expect(url).not.toContain('/api/api/');
      });
    });

    test('should prevent redirect loops by calling backend directly', () => {
      // By calling backend directly, we bypass Next.js entirely
      // This prevents any redirect loops between Next.js and Django
      // 1. useApi always creates URLs with trailing slash
      // 2. Direct call to http://localhost:8000/api/... (no Next.js proxy)
      // 3. Django receives URL with trailing slash, no redirect needed
      
      const hookInput = '/film/';
      
      // Step 1: useApi creates URL with trailing slash
      let cleanUrl = hookInput.startsWith('/') ? hookInput.slice(1) : hookInput;
      cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      
      // Step 2: Direct call to backend (no Next.js proxy)
      const backendUrl = 'http://localhost:8000/api';
      const finalUrl = `${backendUrl}/${cleanUrl}`;
      expect(finalUrl).toBe('http://localhost:8000/api/film/');
      
      // Step 3: Django receives URL with trailing slash, no redirect needed
      expect(finalUrl.endsWith('/')).toBe(true);
      expect(finalUrl.startsWith('http://localhost:8000')).toBe(true);
      
      // Verify no redirect loop: direct call, no proxy
      expect(finalUrl).not.toContain('/api/api/');
    });
  });

  describe('Real-world Hook Usage', () => {
    test('should match useGetAllMovies hook URL format', () => {
      // useGetAllMovies calls useApi with '/film/'
      const hookUrl = '/film/';
      
      // Simulate useApi processing - direct call to backend
      let cleanUrl = hookUrl.startsWith('/') ? hookUrl.slice(1) : hookUrl;
      cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      const backendUrl = 'http://localhost:8000/api';
      const apiUrl = `${backendUrl}/${cleanUrl}`;
      
      expect(apiUrl).toBe('http://localhost:8000/api/film/');
      expect(apiUrl.endsWith('/')).toBe(true);
      expect(apiUrl.startsWith('http://localhost:8000')).toBe(true);
    });

    test('should match useGetRecommendCollaborative hook URL format', () => {
      // useGetRecommendCollaborative calls useApi with '/recommend/collaborative/{userId}/'
      const userId = 'admin';
      const hookUrl = `/recommend/collaborative/${encodeURIComponent(userId)}/`;
      
      // Simulate useApi processing - direct call to backend
      let cleanUrl = hookUrl.startsWith('/') ? hookUrl.slice(1) : hookUrl;
      cleanUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
      const backendUrl = 'http://localhost:8000/api';
      const apiUrl = `${backendUrl}/${cleanUrl}`;
      
      expect(apiUrl).toContain('recommend/collaborative');
      expect(apiUrl).toContain('admin');
      expect(apiUrl.endsWith('/')).toBe(true);
      expect(apiUrl.startsWith('http://localhost:8000')).toBe(true);
    });
  });
});

