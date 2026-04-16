// src/pages/Coin.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coinCapApi } from '../services/api';
import { toggleFavorite, isFavorite } from '../utils/favorites';

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const response = await coinCapApi.getAsset(id);
        const coinData = response.data;
        
        setCoin(coinData);
        setIsFav(isFavorite(coinData.id));
      } catch (err) {
        setError('Error al cargar la información de la criptomoneda');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!coin) return;
    
    toggleFavorite(coin.id);
    const newFavStatus = !isFav;
    setIsFav(newFavStatus);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl">Cargando información...</p>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error || 'No se encontró la criptomoneda'}</p>
        <Link to="/" className="text-blue-600 underline mt-4 inline-block">
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
      <Link 
        to="/"
        className="inline-flex items-center text-blue-600 hover:underline mb-6"
      >
        ← Volver a la lista
      </Link>

      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-4xl">
            {coin.symbol.slice(0, 2)}
          </div>
          <div>
            <h1 className="text-4xl font-bold">{coin.name}</h1>
            <p className="text-gray-500 text-xl">
              {coin.symbol} · Rank #{coin.rank}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleFavorite}
          className={`ml-auto px-6 py-3 rounded-xl text-xl transition-all ${
            isFav 
              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700'
          }`}
        >
          {isFav ? '★ En favoritos' : '☆ Añadir a favoritos'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-500 mb-1">Precio actual</p>
          <p className="text-4xl font-bold">
            ${Number(coin.priceUsd).toLocaleString('es-ES')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-500 mb-1">Cambio 24h</p>
          <p 
            className={`text-4xl font-bold ${
              Number(coin.changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {Number(coin.changePercent24Hr) >= 0 ? '+' : ''}
            {Number(coin.changePercent24Hr).toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
          <p className="text-gray-500 text-sm">Market Cap</p>
          <p className="font-semibold mt-1">
            ${Number(coin.marketCapUsd).toLocaleString('es-ES')}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
          <p className="text-gray-500 text-sm">Volumen 24h</p>
          <p className="font-semibold mt-1">
            ${Number(coin.volumeUsd24Hr).toLocaleString('es-ES')}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
          <p className="text-gray-500 text-sm">Supply</p>
          <p className="font-semibold mt-1">
            {Number(coin.supply).toLocaleString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;