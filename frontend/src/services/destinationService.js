import api from "../api/api";

export const getDestinations = async () => {
  const response = await api.get("/destinations/");
  return response.data;
};

export const searchDestinations = async (filters = {}) => {
  const params = {};

  if (filters.name) params.name = filters.name;
  if (filters.city) params.city = filters.city;
  if (filters.state) params.state = filters.state;
  if (filters.country) params.country = filters.country;
  if (filters.category) params.category = filters.category;
  if (filters.max_cost) params.max_cost = filters.max_cost;
  if (filters.best_time_to_visit) {
    params.best_time_to_visit = filters.best_time_to_visit;
  }

  const response = await api.get("/destinations/search", {
    params,
  });

  return response.data;
};