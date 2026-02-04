import { Calendar, Plus } from 'lucide-react'

export const MenusPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menús</h1>
          <p className="text-gray-600 mt-1">Planifica tus menús semanales con drag-and-drop</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Nuevo Menú</span>
        </button>
      </div>

      <div className="card text-center py-12">
        <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Generador de menús con drag-and-drop (próximamente)</p>
        <p className="text-sm text-gray-500">Esta funcionalidad está en desarrollo</p>
      </div>
    </div>
  )
}