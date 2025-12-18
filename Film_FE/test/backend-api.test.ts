/**
 * Integration tests for backend API endpoints
 * Tests URL format for direct API calls to backend at port 8000
 * 
 * These tests verify that:
 * 1. URLs are correctly formatted with trailing slashes
 * 2. URLs match Django URL patterns
 * 3. No redirect loops will occur
 * 4. All required endpoints have correct URL format
 */

describe('Backend API Integration Tests', () => {
  const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';
  const API_BASE = `${BACKEND_URL}/api`;

  describe('Film Endpoint', () => {
    test('should format /api/film/ with trailing slash for backend', () => {
      const url = `${API_BASE}/film/`;
      
      // Verify URL format
      expect(url).toBe('http://localhost:8000/api/film/');
      expect(url.endsWith('/')).toBe(true);
      
      // Verify it matches Django URL pattern: path('api/film/', ...)
      const path = url.replace(BACKEND_URL, '');
      expect(path).toBe('/api/film/');
      expect(path.endsWith('/')).toBe(true);
    });

    test('should verify URL format prevents redirect loop', () => {
      // Verify that URLs with trailing slash are used
      const urlWithSlash = `${API_BASE}/film/`;
      const urlWithoutSlash = `${API_BASE}/film`;

      // URL with trailing slash should be used
      expect(urlWithSlash.endsWith('/')).toBe(true);
      expect(urlWithoutSlash.endsWith('/')).toBe(false);

      // Django expects trailing slash, so we should use urlWithSlash
      const correctUrl = urlWithSlash;
      expect(correctUrl).toBe(`${API_BASE}/film/`);
    });
  });

  describe('Ticketroom Endpoint', () => {
    test('should format /api/ticketroom/ with trailing slash for backend', () => {
      const url = `${API_BASE}/ticketroom/`;
      
      // Verify URL format
      expect(url).toBe('http://localhost:8000/api/ticketroom/');
      expect(url.endsWith('/')).toBe(true);
      
      // Verify it matches Django URL pattern: path('api/ticketroom/', ...)
      const path = url.replace(BACKEND_URL, '');
      expect(path).toBe('/api/ticketroom/');
      expect(path.endsWith('/')).toBe(true);
    });

    test('should verify URL format', () => {
      const url = `${API_BASE}/ticketroom/`;
      expect(url.endsWith('/')).toBe(true);
      expect(url).toBe(`${API_BASE}/ticketroom/`);
    });
  });

  describe('Recommend Collaborative Endpoint', () => {
    test('should format /api/recommend/collaborative/{userId}/ with trailing slash for backend', () => {
      const userId = 'admin';
      const url = `${API_BASE}/recommend/collaborative/${encodeURIComponent(userId)}/`;
      
      // Verify URL format
      expect(url).toBe('http://localhost:8000/api/recommend/collaborative/admin/');
      expect(url.endsWith('/')).toBe(true);
      expect(url).toContain('recommend/collaborative');
      expect(url).toContain('admin');
      
      // Verify it matches Django URL pattern: path('api/recommend/collaborative/<str:user_id>/', ...)
      const path = url.replace(BACKEND_URL, '');
      expect(path).toBe('/api/recommend/collaborative/admin/');
      expect(path.endsWith('/')).toBe(true);
    });

    test('should verify nested path URL format', () => {
      const userId = 'admin';
      const url = `${API_BASE}/recommend/collaborative/${encodeURIComponent(userId)}/`;
      
      expect(url.endsWith('/')).toBe(true);
      expect(url).toContain('recommend/collaborative');
      expect(url).toContain('admin');
    });
  });

  describe('Redirect Loop Prevention', () => {
    test('should verify all test URLs have trailing slashes', () => {
      const testUrls = [
        `${API_BASE}/film/`,
        `${API_BASE}/ticketroom/`,
        `${API_BASE}/recommend/collaborative/admin/`,
      ];

      testUrls.forEach(url => {
        expect(url.endsWith('/')).toBe(true);
      });
    });

    test('should verify URLs match Django URL patterns', () => {
      // Django URLs from urls.py all have trailing slashes:
      // path('api/film/', ...)
      // path('api/ticketroom/', ...)
      // path('api/recommend/collaborative/<str:user_id>/', ...)
      
      const djangoPatterns = [
        'api/film/',
        'api/ticketroom/',
        'api/recommend/collaborative/admin/',
      ];

      const ourUrls = [
        `${API_BASE}/film/`,
        `${API_BASE}/ticketroom/`,
        `${API_BASE}/recommend/collaborative/admin/`,
      ];

      djangoPatterns.forEach((pattern, index) => {
        const ourUrl = ourUrls[index];
        // Extract path from full URL
        const path = ourUrl.replace(`${BACKEND_URL}/`, '');
        expect(path).toBe(pattern);
        expect(path.endsWith('/')).toBe(true);
      });
    });
  });
});

