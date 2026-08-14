import api from "./api";

export const addFavorite = async (userId, destinationId) => {
  const response = await api.post("/favorites/", {
    user_id: userId,
    destination_id: destinationId,
  });

  return response.data;
};

export const getFavorites = async (userId) => {
  const response = await api.get(`/favorites/${userId}`);

  return response.data;
};

export const removeFavorite = async (favoriteId) => {
  const response = await api.delete(`/favorites/${favoriteId}`);

  return response.data;
};