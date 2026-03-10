// src/pages/Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toggleFavorite, isFavorite } from '../utils/favorites.js';

const mockCoins = [
  { id: 'bitcoin', rank: '1', symbol: 'BTC', name: 'Bitcoin', priceUsd: '68245.12', changePercent24Hr: '2.34' },
  { id: 'ethereum', rank: '2', symbol: 'ETH', name: 'Ethereum', priceUsd: '3489.75', changePercent24Hr: '-1.12' },
  { id: 'tether', rank: '3', symbol: 'USDT', name: 'Tether', priceUsd: '1.00', changePercent24Hr: '0.01' },
  { id: 'binance-coin', rank: '4', symbol: 'BNB', name: 'BNB', priceUsd: '584.20', changePercent24Hr: '0.89' },
  { id: 'solana', rank: '5', symbol: 'SOL', name: 'Solana', priceUsd: '142.67', changePercent24Hr: '3.45' },
  { id: 'usd-coin', rank: '6', symbol: 'USDC', name: 'USD Coin', priceUsd: '1.00', changePercent24Hr: '0.00' },
  { id: 'ripple', rank: '7', symbol: 'XRP', name: 'XRP', priceUsd: '0.58', changePercent24Hr: '1.67' },
  { id: 'cardano', rank: '8', symbol: 'ADA', name: 'Cardano', priceUsd: '0.42', changePercent24Hr: '-0.78' },
];

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const handleToggle = (id) => {
    toggleFavorite(id);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="py-12">
      <div className="container">
        <h1>Top Criptomonedas</h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {mockCoins.map((coin) => {
            const isFav = isFavorite(coin.id);

            return (
              <div key={coin.id} className="card">
                <div style={{ padding: '24px', position: 'relative' }}>
                  <button
                    onClick={() => handleToggle(coin.id)}
                    className={`fav-button ${isFav ? 'fav-active' : 'fav-inactive'}`}
                    style={{ position: 'absolute', top: '16px', right: '16px' }}
                    title={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                  >
                    {isFav ? '★' : '☆'}
                  </button>

                  <Link to={`/coin/${coin.id}`} className="link" style={{ display: 'block' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          backgroundColor: '#6366f1',
                          color: 'white',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          marginRight: '16px',
                        }}
                      >
                        {coin.symbol.slice(0, 2)}
                      </div>

                      <div>
                        <h2 style={{ margin: 0 }}>{coin.name}</h2>
                        <div style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                          {coin.symbol} · #{coin.rank}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>
                        ${Number(coin.priceUsd).toLocaleString('es-ES')}
                      </div>
                      <div
                        className={
                          Number(coin.changePercent24Hr) >= 0
                            ? 'change-positive'
                            : 'change-negative'
                        }
                        style={{ fontSize: '1.1rem', fontWeight: '600' }}
                      >
                        {Number(coin.changePercent24Hr) >= 0 ? '+' : ''}
                        {Number(coin.changePercent24Hr).toFixed(2)}% (24h)
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}