import { createContext, useContext, useState, useEffect } from 'react'

const MonitorContext = createContext(null)

export const useMonitor = () => {
  const context = useContext(MonitorContext)
  if (!context) {
    throw new Error('useMonitor must be used within a MonitorProvider')
  }
  return context
}

export const MonitorProvider = ({ children }) => {
  const [config, setConfig] = useState({
    backendUrl: localStorage.getItem('backendUrl') || 'https://chefmenu-pro-backend.onrender.com',
    frontendUrl: localStorage.getItem('frontendUrl') || 'https://chefmenu-pro-frontend.vercel.app',
    refreshInterval: parseInt(localStorage.getItem('refreshInterval') || '5000'),
  })

  const [services, setServices] = useState({
    backend: { status: 'unknown', responseTime: 0, lastCheck: null },
    frontend: { status: 'unknown', responseTime: 0, lastCheck: null },
    database: { status: 'unknown', responseTime: 0, lastCheck: null },
  })

  const [logs, setLogs] = useState([])
  const [stats, setStats] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    uptime: 100,
  })

  const [isMonitoring, setIsMonitoring] = useState(false)
  const [monitorInterval, setMonitorInterval] = useState(null)

  const addLog = (level, message, details = null) => {
    const log = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
    }
    setLogs((prev) => [log, ...prev].slice(0, 100))
  }

  const checkService = async (url, serviceName) => {
    const startTime = Date.now()
    
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        cache: 'no-cache',
      })
      const responseTime = Date.now() - startTime

      setServices((prev) => ({
        ...prev,
        [serviceName]: {
          status: response.ok ? 'online' : 'offline',
          responseTime,
          lastCheck: new Date().toISOString(),
        },
      }))

      if (response.ok) {
        addLog('success', `${serviceName} está online`, { responseTime, url })
        setStats((prev) => ({
          ...prev,
          totalRequests: prev.totalRequests + 1,
          successfulRequests: prev.successfulRequests + 1,
          averageResponseTime: (prev.averageResponseTime * prev.successfulRequests + responseTime) / (prev.successfulRequests + 1),
        }))
      } else {
        addLog('error', `${serviceName} devolvió ${response.status}`, { url, status: response.status })
        setStats((prev) => ({
          ...prev,
          totalRequests: prev.totalRequests + 1,
          failedRequests: prev.failedRequests + 1,
        }))
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      setServices((prev) => ({
        ...prev,
        [serviceName]: {
          status: 'offline',
          responseTime,
          lastCheck: new Date().toISOString(),
        },
      }))
      addLog('error', `${serviceName} no responde`, { url, error: error.message })
      setStats((prev) => ({
        ...prev,
        totalRequests: prev.totalRequests + 1,
        failedRequests: prev.failedRequests + 1,
      }))
    }
  }

  const checkBackend = async () => {
    await checkService(`${config.backendUrl}/api/health`, 'backend')
  }

  const checkFrontend = async () => {
    await checkService(config.frontendUrl, 'frontend')
  }

  const checkAllServices = async () => {
    await Promise.all([
      checkBackend(),
      checkFrontend(),
    ])
  }

  const startMonitoring = () => {
    setIsMonitoring(true)
    addLog('info', 'Iniciando monitoreo', { config })
    
    const interval = setInterval(checkAllServices, config.refreshInterval)
    setMonitorInterval(interval)
    
    checkAllServices()
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    if (monitorInterval) {
      clearInterval(monitorInterval)
      setMonitorInterval(null)
    }
    addLog('info', 'Monitoreo detenido')
  }

  const updateConfig = (newConfig) => {
    const updated = { ...config, ...newConfig }
    setConfig(updated)
    
    Object.entries(updated).forEach(([key, value]) => {
      localStorage.setItem(key, value)
    })

    addLog('info', 'Configuración actualizada', { config: updated })

    if (isMonitoring) {
      stopMonitoring()
      startMonitoring()
    }
  }

  const clearLogs = () => {
    setLogs([])
    addLog('info', 'Logs limpiados')
  }

  useEffect(() => {
    return () => {
      if (monitorInterval) {
        clearInterval(monitorInterval)
      }
    }
  }, [monitorInterval])

  const value = {
    config,
    services,
    logs,
    stats,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    updateConfig,
    clearLogs,
    checkAllServices,
  }

  return <MonitorContext.Provider value={value}>{children}</MonitorContext.Provider>
}