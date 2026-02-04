import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ChefHat, UserPlus } from 'lucide-react'

export const RegisterPage = () => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(nombre, apellido, email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="card max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-100 p-3 rounded-full">
            <ChefHat className="h-12 w-12 text-primary-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Crea tu cuenta</h1>
        <p className="text-gray-600 text-center mb-6">Empieza a gestionar tus recetas gratis</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input"
                placeholder="Juan"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="input"
                placeholder="Pérez"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary flex items-center justify-center space-x-2"
          >
            <UserPlus className="h-5 w-5" />
            <span>{loading ? 'Registrando...' : 'Crear Cuenta'}</span>
          </button>
        </form>

        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700">
            <strong>Plan GRATIS:</strong> 50 recetas, inventario básico, menús semanales
          </p>
        </div>

        <p className="text-center mt-4 text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}