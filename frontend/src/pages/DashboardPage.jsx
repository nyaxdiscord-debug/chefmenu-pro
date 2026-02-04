import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { ingredientesApi, recetasApi } from '../services'
import { AlertTriangle, TrendingUp, DollarSign, Package } from 'lucide-react'

export const DashboardPage = () => {
  const { user, isPro } = useAuth()
  const [stockBajo, setStockBajo] = useState([])
  const [recetasCount, setRecetasCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [stockRes, recetasRes] = await Promise.all([
        ingredientesApi.getStockBajo(),
        recetasApi.getAll(),
      ])
      setStockBajo(stockRes.data)
      setRecetasCount(recetasRes.data.length)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Cargando dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bienvenido de nuevo, {user?.nombre}</p>
        </div>
        {!isPro && (
          <div className="bg-primary-50 border border-primary-200 px-4 py-2 rounded-lg">
            <span className="text-sm text-primary-700">
              {recetasCount}/50 recetas usadas - <strong>Actualiza a PRO</strong> para recetas ilimitadas
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recetas Activas</p>
              <p className="text-2xl font-bold text-gray-900">{recetasCount}</p>
            </div>
            <Package className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-red-600">{stockBajo.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Coste Medio/Plato</p>
              <p className="text-2xl font-bold text-gray-900">3,47€</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Margen Ganancia</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            Alertas de Stock Bajo
          </h2>
          {stockBajo.length === 0 ? (
            <p className="text-gray-600 py-4">No hay alertas de stock bajo</p>
          ) : (
            <div className="space-y-3">
              {stockBajo.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.nombre}</p>
                    <p className="text-sm text-red-600">
                      Actual: {item.stockActual} {item.unidad} | Mínimo: {item.alertaStock} {item.unidad}
                    </p>
                  </div>
                  <button className="btn btn-primary text-sm">Reponer</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Grafica Costes vs Ingresos</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-600">Gráfico de ejemplo (próximamente con Recharts)</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Menú de Esta Semana</h2>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia) => (
            <div key={dia} className="p-2 bg-primary-50 rounded-lg">
              <p className="font-medium text-primary-700">{dia}</p>
              <p className="text-sm text-gray-600 mt-1">13:00</p>
              <p className="text-xs text-gray-500">Sin asignar</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}