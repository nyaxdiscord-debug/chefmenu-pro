import { FileText, Download } from 'lucide-react'

export const ReportesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-600 mt-1">Analiza costes, inventario y rendimiento</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Exportar PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-2">Reporte Semanal</h3>
          <p className="text-gray-600 text-sm mb-4">Costes, ventas y márgenes de la semana</p>
          <button className="btn btn-secondary w-full">Generar</button>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Reporte de Inventario</h3>
          <p className="text-gray-600 text-sm mb-4">Stock actual y rotación de ingredientes</p>
          <button className="btn btn-secondary w-full">Generar</button>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Reporte de Recetas</h3>
          <p className="text-gray-600 text-sm mb-4">Recetas más usadas y rentables</p>
          <button className="btn btn-secondary w-full">Generar</button>
        </div>
      </div>

      <div className="card text-center py-12">
        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Módulo de reportes en desarrollo</p>
        <p className="text-sm text-gray-500">Próximamente: gráficos interactivos y exportación a PDF</p>
      </div>
    </div>
  )
}