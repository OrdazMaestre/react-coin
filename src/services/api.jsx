// src/services/api.js
const API_BASE_URL = 'https://rest.coincap.io/v2';
const API_KEY = import.meta.env.VITE_COINCAP_API_KEY;

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

export const coinCapApi = {
  // Obtener las 100 primeras criptos
  getAssets: async (limit = 100) => {
    const response = await fetch(`${API_BASE_URL}/assets?limit=${limit}`, { headers });
    if (!response.ok) throw new Error('Error al obtener datos');
    return response.json();
  },

  // Obtener detalle de una crypto
  getAsset: async (id) => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, { headers });
    if (!response.ok) throw new Error('Error al obtener la crypto');
    return response.json();
  },

  // Obtener historial (opcional, para gráficos)
  getAssetHistory: async (id, interval = 'd1') => {
    const response = await fetch(`${API_BASE_URL}/assets/${id}/history?interval=${interval}`, { headers });
    if (!response.ok) throw new Error('Error al obtener historial');
    return response.json();
  }
};