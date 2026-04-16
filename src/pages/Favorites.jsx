// src/pages/Favorites.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coinCapApi } from '../services/api';
import { getFavorites, toggleFavorite } from '../utils/favorites';

const Favorites = () => {
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const favoriteIds = getFavorites();

      if (favoriteIds.length === 0) {
        setFavoriteCoins([]);
        setLoading(false);
        return;
      }

      const promises = favoriteIds.map(id => 
        coinCapApi.getAsset(id).then(res => res.data)
      );

      const coinsData = await Promise.all(promises);
      setFavoriteCoins(coinsData);
    } catch (err) {
      setError('Error al cargar tus favoritas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemoveFavorite = (id) => {
    toggleFavorite(id);
    setFavoriteCoins(prev => prev.filter(coin => coin.id !== id));
  };

  if (loading) return <div className="text-center py-20 text-xl">Cargando favoritas...</div>;
  
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  if (favoriteCoins.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl mb-4">☆ Sin favoritas todavía</h2>
        <p className="text-gray-500 mb-6">Añade criptomonedas a favoritos desde la página principal</p>
        <Link 
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Explorar criptomonedas
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCoins.map(coin => (
          <div
            key={coin.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition relative"
          >
            <button
              onClick={() => handleRemoveFavorite(coin.id)}
              className="absolute top-4 right-4 text-2xl hover:scale-110 transition"
            >
              ✕
            </button>

            <Link to={`/coin/${coin.id}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                  {coin.symbol.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-2xl">{coin.name}</h3>
                  <p className="text-gray-500">{coin.symbol}</p>
                </div>
              </div>

              <p className="text-3xl font-semibold">
                ${Number(coin.priceUsd).toLocaleString('es-ES')}
              </p>
              <p className={`text-sm mt-1 ${
                Number(coin.changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Number(coin.changePercent24Hr) >= 0 ? '↑' : '↓'} 
                {Number(coin.changePercent24Hr).toFixed(2)}% 24h
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;