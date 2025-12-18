/**
 * MSW (Mock Service Worker) handlers for API mocking in tests.
 * This allows us to mock API responses without hitting the real backend.
 */
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:8000/api';

export const handlers = [
  // Mock GET /api/film/
  http.get(`${API_BASE_URL}/film/`, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Test Movie 1',
        total_vote: 100,
        rating: 8.5,
      },
      {
        id: 2,
        name: 'Test Movie 2',
        total_vote: 50,
        rating: 7.0,
      },
    ]);
  }),

  // Mock GET /api/ticketroom/
  http.get(`${API_BASE_URL}/ticketroom/`, () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Room 1',
        capacity: 100,
      },
    ]);
  }),

  // Mock GET /api/recommend/collaborative/:userId/
  http.get(`${API_BASE_URL}/recommend/collaborative/:userId/`, ({ params }) => {
    const { userId } = params;
    return HttpResponse.json([
      {
        id: 1,
        name: `Recommended Movie for ${userId}`,
        score: 0.95,
      },
    ]);
  }),

  // Mock POST /api/login/
  http.post(`${API_BASE_URL}/login/`, async ({ request }) => {
    const body = await request.json() as { username: string; password: string };
    if (body.username === 'testuser' && body.password === 'testpass') {
      return HttpResponse.json({
        message: 'Successfully logged in.',
        token: 'mock-token-123',
      });
    }
    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Mock POST /api/register/
  http.post(`${API_BASE_URL}/register/`, async ({ request }) => {
    const body = await request.json() as { account?: string; name?: string };
    return HttpResponse.json({
      message: 'Registration successful!',
      user: {
        account: body.account || '',
        name: body.name || '',
      },
    });
  }),
];
