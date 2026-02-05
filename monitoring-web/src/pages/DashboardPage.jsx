import { useMonitor } from '../context/MonitorContext'

export const DashboardPage = () => {
  const { services, stats } = useMonitor()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Estado general de ChefMenu Pro</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Peticiones</p>
              <p className="text-2xl font-bold text-white">{stats.totalRequests}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Exitosos</p>
              <p className="text-2xl font-bold text-green-400">{stats.successfulRequests}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Fallidos</p>
              <p className="text-2xl font-bold text-red-400">{stats.failedRequests}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-white">{stats.averageResponseTime?.toFixed(0)}ms</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Estado de Servicios</h2>
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Backend: {services.backend?.status}</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Frontend: {services.frontend?.status}</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Database: {services.database?.status}</p>
          </div>
        </div>
      </div>
    </div>
  )
}