// src/utils/favorites.js

export const getFavorites = () => {
  const favs = localStorage.getItem('favorites');
  return favs ? JSON.parse(favs) : [];
};

export const isFavorite = (coinId) => {
  return getFavorites().includes(coinId);
};

export const toggleFavorite = (coinId) => {
  let favs = getFavorites();
  if (favs.includes(coinId)) {
    favs = favs.filter(id => id !== coinId);
  } else {
    favs.push(coinId);
  }
  localStorage.setItem('favorites', JSON.stringify(favs));
  return favs;
};