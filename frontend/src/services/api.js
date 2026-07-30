import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Extracts a readable error message from an Axios error, falling back to
 * something generic if the backend didn't send structured JSON.
 */
function extractErrorMessage(error) {
  if (error.response?.data?.detail) return error.response.data.detail;
  if (error.response?.data?.error) return error.response.data.error;
  if (error.code === "ECONNABORTED") {
    return "The request took too long. Please try again.";
  }
  if (!error.response) {
    return "Could not reach the server. Is the backend running?";
  }
  return "Something went wrong. Please try again.";
}

export async function generateTrip(payload) {
  try {
    const { data } = await api.post("/api/trip/generate", payload);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function askTripQuestion({ tripContext, messages, question }) {
  try {
    const { data } = await api.post("/api/trip/chat", {
      trip_context: tripContext,
      messages,
      question,
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export default api;
