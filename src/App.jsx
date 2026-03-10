// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Coin from './pages/Coin'
import Favorites from './pages/Favorites'

function App() {
  return (
    <>
      <Navbar />

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Coin />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<h2>404 - No encontrado</h2>} />
        </Routes>
      </main>
    </>
  )
}

export default App