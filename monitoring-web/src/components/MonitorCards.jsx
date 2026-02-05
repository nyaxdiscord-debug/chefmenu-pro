import { useMonitor } from '../context/MonitorContext'
import { 
  Server, 
  Globe, 
  Database, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Clock,
  Zap,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

export const ServiceCard = ({ serviceName, icon: Icon, title, url }) => {
  const { services } = useMonitor()
  const service = services[serviceName]

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400'
      case 'offline': return 'text-red-400'
      case 'warning': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusDot = (status) => {
    switch (status) {
      case 'online': return 'status-online'
      case 'offline': return 'status-offline'
      case 'warning': return 'status-warning'
      default: return 'status-loading'
    }
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400 truncate max-w-[200px]">{url}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`status-dot ${getStatusDot(service.status)}`} />
          <span className={`text-sm font-medium ${getStatusColor(service.status)}`}>
            {service.status === 'online' ? 'Online' : 
             service.status === 'offline' ? 'Offline' : 
             service.status === 'warning' ? 'Warning' : 'Checking...'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
            <Clock className="h-4 w-4" />
            <span>Respuesta</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {service.responseTime} <span className="text-sm text-gray-400">ms</span>
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
            <Activity className="h-4 w-4" />
            <span>Último check</span>
          </div>
          <p className="text-lg font-bold text-white">
            {service.lastCheck ? new Date(service.lastCheck).toLocaleTimeString() : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

export const StatsCard = ({ icon: Icon, title, value, change, color }) => (
  <div className="glass-card rounded-xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`p-3 ${color}/20 rounded-lg`}>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
    {change !== undefined && (
      <div className="flex items-center space-x-2 mt-4 text-sm">
        {change > 0 ? <ArrowUp className="h-4 w-4 text-green-400" /> : <ArrowDown className="h-4 w-4 text-red-400" />}
        <span className={change > 0 ? 'text-green-400' : 'text-red-400'}>
          {Math.abs(change)}% vs anterior
        </span>
      </div>
    )}
  </div>
)