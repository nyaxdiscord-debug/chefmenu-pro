import { useNavigate } from 'react-router-dom'
import { useMonitor } from '../context/MonitorContext'
import { RefreshCw, Play, Square, Trash2, Monitor, Home } from 'lucide-react'

export const Header = () => {
  const { isMonitoring, startMonitoring, stopMonitoring, checkAllServices, clearLogs } = useMonitor()
  const navigate = useNavigate()

  return (
    <header className="glass-card rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Monitor className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ChefMenu Pro</h1>
            <p className="text-sm text-gray-400">Panel de Monitoreo en Tiempo Real</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={checkAllServices}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="h-5 w-5" />
            <span className="hidden sm:inline">Actualizar</span>
          </button>

          {!isMonitoring ? (
            <button
              onClick={startMonitoring}
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span className="hidden sm:inline">Iniciar</span>
            </button>
          ) : (
            <button
              onClick={stopMonitoring}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center space-x-2"
            >
              <Square className="h-5 w-5" />
              <span className="hidden sm:inline">Detener</span>
            </button>
          )}

          <button
            onClick={clearLogs}
            className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors flex items-center space-x-2"
            title="Limpiar logs"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}