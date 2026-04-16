// src/App.jsx
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'   // ← Usamos el archivo de rutas

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto p-4 pt-8">
        <AppRoutes />
      </main>
    </div>
  )
}

export default App