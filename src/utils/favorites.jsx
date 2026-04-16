// src/utils/favorites.jsx

// Obtener todas las IDs de favoritos
export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

// Comprobar si una crypto está en favoritos
export const isFavorite = (coinId) => {
  return getFavorites().includes(coinId);
};

// Añadir o quitar de favoritos
export const toggleFavorite = (coinId) => {
  let favorites = getFavorites();

  if (favorites.includes(coinId)) {
    favorites = favorites.filter(id => id !== coinId);
  } else {
    favorites.push(coinId);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  return favorites;
};