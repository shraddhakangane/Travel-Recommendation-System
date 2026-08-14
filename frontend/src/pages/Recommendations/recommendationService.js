import api from "../api/api";

export async function getRecommendations() {
  const response = await api.get("/recommendations/");
  return response.data;
}