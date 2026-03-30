import { ENDPOINTS } from "../constants"

export async function postQuery(query: string) {
  const response = await fetch(ENDPOINTS.PROCESS_USER_QUERY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) throw new Error("Request failed")

  return response.json()
}