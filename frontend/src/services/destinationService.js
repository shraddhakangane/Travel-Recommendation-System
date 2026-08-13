import api from "../api/api";

export const getDestinations = async () => {
  const response = await api.get("/destinations/");
  return response.data;
};