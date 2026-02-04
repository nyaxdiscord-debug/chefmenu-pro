import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home, Utensils, Package, Calendar, FileText, LogOut, ChefHat } from 'lucide-react'

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/ingredientes', label: 'Ingredientes', icon: Package },
    { path: '/recetas', label: 'Recetas', icon: Utensils },
    { path: '/menus', label: 'Menús', icon: Calendar },
    { path: '/reportes', label: 'Reportes', icon: FileText },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">ChefMenu Pro</span>
          </Link>

          {isAuthenticated && (
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </Link>
                )
              })}

              <div className="ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600">Hola, {user?.nombre}</span>
                {user?.planTipo === 'FREE' && (
                  <span className="ml-2 badge bg-green-100 text-green-800">Free</span>
                )}
                {user?.planTipo === 'PRO' && (
                  <span className="ml-2 badge bg-primary-100 text-primary-800">PRO</span>
                )}
              </div>

              <button
                onClick={logout}
                className="ml-4 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}