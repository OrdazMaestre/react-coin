// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coinCapApi } from '../services/api';
import { toggleFavorite, isFavorite } from '../utils/favorites';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await coinCapApi.getAssets(100);
        setCoins(data.data);
      } catch (err) {
        setError('Error al cargar las criptomonedas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavorite = (coin, e) => {
    e.preventDefault();
    toggleFavorite(coin);
    // Forzar re-render
    setCoins([...coins]);
  };

  if (loading) return <div className="text-center py-10">Cargando criptomonedas...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar criptomoneda..."
          className="w-full p-3 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCoins.map(coin => (
          <Link
            key={coin.id}
            to={`/coin/${coin.id}`}
            className="block bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl">{coin.name}</h3>
                <p className="text-gray-500">{coin.symbol}</p>
              </div>
              <button
                onClick={(e) => handleFavorite(coin, e)}
                className="text-2xl"
              >
                {isFavorite(coin.id) ? '❤️' : '♡'}
              </button>
            </div>

            <div className="mt-4">
              <p className="text-2xl font-semibold">
                ${parseFloat(coin.priceUsd).toFixed(2)}
              </p>
              <p className={`text-sm ${coin.changePercent24Hr > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {parseFloat(coin.changePercent24Hr).toFixed(2)}% (24h)
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;