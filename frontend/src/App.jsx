import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { IngredientesPage } from './pages/IngredientesPage'
import { RecetasPage } from './pages/RecetasPage'
import { MenusPage } from './pages/MenusPage'
import { ReportesPage } from './pages/ReportesPage'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ingredientes"
              element={
                <ProtectedRoute>
                  <IngredientesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recetas"
              element={
                <ProtectedRoute>
                  <RecetasPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/menus"
              element={
                <ProtectedRoute>
                  <MenusPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reportes"
              element={
                <ProtectedRoute>
                  <ReportesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App