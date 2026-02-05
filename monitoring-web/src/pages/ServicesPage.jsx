import { useMonitor } from '../context/MonitorContext'
import { Server, Globe, Database, Cloud } from 'lucide-react'

export const ServicesPage = () => {
  const { config, updateConfig } = useMonitor()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Configuración de Servicios</h1>
        <p className="text-gray-400">Configura las URLs de tus servicios para monitorearlos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Backend</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">URL del Backend</label>
              <input
                type="text"
                value={config.backendUrl}
                onChange={(e) => updateConfig({ backendUrl: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                placeholder="https://chefmenu-pro-backend.onrender.com/api"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Intervalo de Refresco (ms)</label>
              <input
                type="number"
                value={config.refreshInterval}
                onChange={(e) => updateConfig({ refreshInterval: parseInt(e.target.value) || 5000 })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                placeholder="5000"
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Frontend</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">URL del Frontend</label>
              <input
                type="text"
                value={config.frontendUrl}
                onChange={(e) => updateConfig({ frontendUrl: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                placeholder="https://chefmenu-pro-frontend.vercel.app"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Información del Sistema</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Versión</p>
            <p className="text-lg font-bold text-white">1.0.0</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Estado</p>
            <p className="text-lg font-bold text-green-400">Activo</p>
          </div>
        </div>
      </div>
    </div>
  )
}