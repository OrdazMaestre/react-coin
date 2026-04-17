// src/services/api.js
const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const coinCapApi = {
  getAssets: async (limit = 100) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
      );

      if (!response.ok) throw new Error('Error al cargar datos');

      const data = await response.json();

      return {
        data: data.map(coin => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          priceUsd: coin.current_price,
          changePercent24Hr: coin.price_change_percentage_24h || 0,
          marketCapUsd: coin.market_cap,
          rank: coin.market_cap_rank,
        }))
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getAsset: async (id) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/coins/${id}?market_data=true`
      );

      if (!response.ok) throw new Error('Crypto no encontrada');

      const coin = await response.json();

      return {
        data: {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          priceUsd: coin.market_data.current_price.usd,
          changePercent24Hr: coin.market_data.price_change_percentage_24h || 0,
          marketCapUsd: coin.market_data.market_cap.usd,
          volumeUsd24Hr: coin.market_data.total_volume.usd,
          rank: coin.market_cap_rank,
        }
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};