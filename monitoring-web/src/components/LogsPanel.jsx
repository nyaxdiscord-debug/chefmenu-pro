import { useMonitor } from '../context/MonitorContext'
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Trash2
} from 'lucide-react'

export const LogsPanel = () => {
  const { logs, clearLogs } = useMonitor()

  const getLogIcon = (level) => {
    switch (level) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case 'error': return <XCircle className="h-4 w-4 text-red-400" />
      default: return <Info className="h-4 w-4 text-blue-400" />
    }
  }

  const getLogClass = (level) => {
    switch (level) {
      case 'success': return 'log-success'
      case 'warning': return 'log-warning'
      case 'error': return 'log-error'
      default: return 'log-info'
    }
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-yellow-400" />
          <span>Logs en Tiempo Real</span>
        </h2>
        <button
          onClick={clearLogs}
          className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center space-x-1"
          title="Limpiar logs"
        >
          <Trash2 className="h-4 w-4" />
          <span>Limpiar</span>
        </button>
      </div>

      <div className="h-96 overflow-y-auto bg-slate-900/50 rounded-lg p-4">
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Info className="h-12 w-12 mx-auto mb-2 text-blue-400" />
              <p>No hay logs</p>
              <p className="text-sm">Inicia el monitoreo para ver activity</p>
            </div>
          </div>
        ) : (
          <div>
            {logs.map((log) => (
              <div key={log.id} className={`log-entry ${getLogClass(log.level)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    {getLogIcon(log.level)}
                    <span className="text-white font-medium">{log.message}</span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {log.details && (
                  <pre className="mt-1 text-xs text-gray-400 overflow-x-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}