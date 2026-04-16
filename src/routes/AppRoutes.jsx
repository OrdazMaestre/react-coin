import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Coin from '../pages/Coin';
import Favorites from '../pages/Favorites';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<Coin />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<h2>404 - No encontrado</h2>} />
    </Routes>
  );
}