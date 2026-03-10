import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFavorites } from '../utils/favorites'

export default function Favorites() {
  const [favoriteCoins, setFavoriteCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const favIds = getFavorites()
    if (favIds.length === 0) {
      setLoading(false)
      return
    }

    const API_KEY = import.meta.env.VITE_API_KEY

    // Podemos pedir varias monedas separadas por coma
    fetch(`https://api.coincap.io/v2/assets?ids=${favIds.join(',')}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    })
      .then(res => res.json())
      .then(data => {
        setFavoriteCoins(data.data || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando favoritos...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Favoritos</h1>

      {favoriteCoins.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          Aún no tienes criptomonedas favoritas
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteCoins.map(coin => (
            <Link
              key={coin.id}
              to={`/coin/${coin.id}`}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {coin.name} ({coin.symbol})
                  </h2>
                  <p>${Number(coin.priceUsd).toFixed(2)}</p>
                </div>
                <span className={Number(coin.changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {Number(coin.changePercent24Hr).toFixed(2)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}