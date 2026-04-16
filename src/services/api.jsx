// src/services/api.js
const API_BASE_URL = '/coingecko/api/v3';

export const coinCapApi = {
  getAssets: async (limit = 100) => {
    const response = await fetch(
      `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      data: data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        priceUsd: coin.current_price,
        changePercent24Hr: coin.price_change_percentage_24h,
        marketCapUsd: coin.market_cap,
        volumeUsd24Hr: coin.total_volume,
        rank: coin.market_cap_rank,
      }))
    };
  },

  getAsset: async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    
    if (!response.ok) throw new Error('Crypto no encontrada');
    
    const coin = await response.json();
    
    return {
      data: {
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        priceUsd: coin.market_data.current_price.usd,
        changePercent24Hr: coin.market_data.price_change_percentage_24h,
        marketCapUsd: coin.market_data.market_cap.usd,
        volumeUsd24Hr: coin.market_data.total_volume.usd,
        rank: coin.market_cap_rank,
        supply: coin.market_data.circulating_supply,
      }
    };
  }
};