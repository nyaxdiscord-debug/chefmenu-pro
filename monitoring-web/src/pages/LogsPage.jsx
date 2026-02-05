import { LogsPanel } from '../components/LogsPanel'

export const LogsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Logs del Sistema</h1>
        <p className="text-gray-400">Historial completo de eventos y errores</p>
      </div>

      <LogsPanel />
    </div>
  )
}