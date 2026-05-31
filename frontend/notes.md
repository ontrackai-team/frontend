BASE URL:
http://localhost:8000

ENDPOINTS:
GET /health
GET /assessments
GET /assessments/{id}
POST /assessments
DELETE /assessments/{id}

CURRENT BACKEND STATE:

- returns strings for assessments (temporary)
- will later return full objects

FRONTEND STRATEGY:

- use mock data now
- use normalizeAssessment to prevent crashes
- swap to real API when backend updates

GOAL:
Stable API integration layer ready for Next.js frontend.
