import { Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { MonitorProvider } from './context/MonitorContext'
import { Header } from './components/Header'
import { DashboardPage } from './pages/DashboardPage'
import { ServicesPage } from './pages/ServicesPage'
import { LogsPage } from './pages/LogsPage'

function App() {
  return (
    <BrowserRouter>
      <MonitorProvider>
        <div className="min-h-screen">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </MonitorProvider>
    </BrowserRouter>
  )
}

export default App