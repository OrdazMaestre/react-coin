// src/pages/Coin.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toggleFavorite, isFavorite } from '../utils/favorites.js';

// ... mantén mockCoinData

export default function Coin() {
  const { id } = useParams();
  const [favorite, setFavorite] = useState(isFavorite(id));

  const coin = mockCoinData[id] || mockCoinData.default;

  const handleToggle = () => {
    toggleFavorite(id);
    setFavorite(!favorite);
  };

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  return (
    <div className="py-12">
      <div className="container">
        <Link to="/" className="link" style={{ fontSize: '1.1rem', marginBottom: '2rem', display: 'inline-block' }}>
          ← Volver a la lista
        </Link>

        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ padding: '40px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {coin.symbol.slice(0, 2)}
                </div>
                <div>
                  <h1 style={{ margin: 0, fontSize: '2.8rem' }}>{coin.name}</h1>
                  <div style={{ color: '#4b5563', fontSize: '1.4rem', marginTop: '0.25rem' }}>
                    {coin.symbol} · Rank #{coin.rank}
                  </div>
                </div>
              </div>

              <button
                onClick={handleToggle}
                style={{
                  padding: '12px 28px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '9999px',
                  border: favorite ? '2px solid #f59e0b' : '2px solid #d1d5db',
                  backgroundColor: favorite ? '#fef3c7' : 'transparent',
                  color: favorite ? '#92400e' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {favorite ? '★ En favoritos' : '☆ Añadir a favoritos'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              <div className="stat-box">
                <div className="stat-label">Precio actual</div>
                <div className="stat-value">
                  ${Number(coin.priceUsd).toLocaleString('es-ES')}
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-label">Cambio 24h</div>
                <div
                  className="stat-value"
                  style={{
                    color: Number(coin.changePercent24Hr) >= 0 ? '#10b981' : '#ef4444',
                  }}
                >
                  {Number(coin.changePercent24Hr) >= 0 ? '+' : ''}
                  {Number(coin.changePercent24Hr).toFixed(2)}%
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-label">Market Cap</div>
                <div className="stat-value">
                  ${Number(coin.marketCapUsd).toLocaleString('es-ES')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}