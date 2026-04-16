// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Coin from '../pages/Coin'
import Favorites from '../pages/Favorites'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<Coin />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<h2 className="text-center text-2xl py-20">404 - Página no encontrada</h2>} />
    </Routes>
  )
}

export default AppRoutes