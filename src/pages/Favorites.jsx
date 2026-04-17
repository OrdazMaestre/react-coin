// src/pages/Favorites.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, toggleFavorite } from '../utils/favorites';

const Favorites = () => {
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      const ids = getFavorites();
      
      // Convertimos solo a strings por si hay datos corruptos
      const cleanIds = ids
        .filter(id => id && typeof id === 'string')
        .map(id => id.toLowerCase().trim());

      // Creamos datos mínimos por ahora (para no romper)
      const mockCoins = cleanIds.map(id => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        symbol: id.toUpperCase().slice(0, 4),
        priceUsd: 0,
        changePercent24Hr: 0
      }));

      setFavoriteCoins(mockCoins);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = (id) => {
    toggleFavorite(id);
    setFavoriteCoins(prev => prev.filter(coin => coin.id !== id));
  };

  if (loading) {
    return <div className="text-center py-20">Cargando...</div>;
  }

  if (favoriteCoins.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl mb-4">☆ No tienes favoritas aún</h2>
        <p className="text-gray-500 mb-6">Ve a la página principal y marca algunas con el ❤️</p>
        <Link 
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Ir a Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Favoritas ❤️</h1>
        <p className="text-gray-500">{favoriteCoins.length} criptomonedas</p>
      </div>

      <div className="coin-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCoins.map(coin => (
          <div
            key={coin.id}
            className="coin-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition relative"
          >
            <button
              onClick={() => handleRemoveFavorite(coin.id)}
              className="absolute top-4 right-4 text-2xl text-red-500 hover:text-red-600 transition"
            >
              ✕
            </button>

            <Link to={`/coin/${coin.id}`} className="block">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                  {coin.symbol.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-xl">{coin.name}</h3>
                  <p className="text-gray-500">{coin.symbol}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Datos no disponibles temporalmente</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;