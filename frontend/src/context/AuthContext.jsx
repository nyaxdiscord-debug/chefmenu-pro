import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}')
        setUser(userData)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password })
    const { token, usuarioId, email: userEmail, nombre, planTipo } = response.data
    
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify({ id: usuarioId, email: userEmail, nombre, planTipo }))
    setUser({ id: usuarioId, email: userEmail, nombre, planTipo })
    return response.data
  }

  const register = async (nombre, apellido, email, password) => {
    const response = await api.post('/api/auth/register', { nombre, apellido, email, password })
    const { token, usuarioId, email: userEmail, nombre: userName, planTipo } = response.data
    
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify({ id: usuarioId, email: userEmail, nombre: userName, planTipo }))
    setUser({ id: usuarioId, email: userEmail, nombre: userName, planTipo })
    return response.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const isAuthenticated = !!user
  const isPro = user?.planTipo === 'PRO'

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isPro, loading }}>
      {children}
    </AuthContext.Provider>
  )
}