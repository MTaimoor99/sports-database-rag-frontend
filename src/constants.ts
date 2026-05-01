export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000"
export const API_VERSION = "v1"
export const API_BASE_URL = `${BACKEND_URL}/api/${API_VERSION}`

// Endpoints
export const ENDPOINTS = {
  PROCESS_USER_QUERY: `${API_BASE_URL}/process-user-query`,
} as const