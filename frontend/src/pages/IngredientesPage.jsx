import { useState, useEffect } from 'react'
import { ingredientesApi } from '../services'
import { Package, Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react'

export const IngredientesPage = () => {
  const [ingredientes, setIngredientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingIngrediente, setEditingIngrediente] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    precioUnit: '',
    unidad: '',
    stockActual: '',
    alertaStock: '',
    proveedor: '',
  })

  useEffect(() => {
    loadIngredientes()
  }, [])

  const loadIngredientes = async () => {
    try {
      const response = await ingredientesApi.getAll()
      setIngredientes(response.data)
    } catch (error) {
      console.error('Error loading ingredientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingIngrediente) {
        await ingredientesApi.update(editingIngrediente.id, formData)
      } else {
        await ingredientesApi.create(formData)
      }
      loadIngredientes()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving ingrediente:', error)
    }
  }

  const handleEdit = (ingrediente) => {
    setEditingIngrediente(ingrediente)
    setFormData({
      nombre: ingrediente.nombre,
      precioUnit: ingrediente.precioUnit,
      unidad: ingrediente.unidad,
      stockActual: ingrediente.stockActual,
      alertaStock: ingrediente.alertaStock || '',
      proveedor: ingrediente.proveedor || '',
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este ingrediente?')) {
      try {
        await ingredientesApi.delete(id)
        loadIngredientes()
      } catch (error) {
        console.error('Error deleting ingrediente:', error)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingIngrediente(null)
    setFormData({
      nombre: '',
      precioUnit: '',
      unidad: '',
      stockActual: '',
      alertaStock: '',
      proveedor: '',
    })
  }

  if (loading) {
    return <div className="text-center py-8">Cargando ingredientes...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ingredientes</h1>
          <p className="text-gray-600 mt-1">Gestiona tu inventario de ingredientes</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Añadir Ingrediente</span>
        </button>
      </div>

      {ingredientes.length === 0 ? (
        <div className="card text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No hay ingredientes registrados</p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            Añadir Primer Ingrediente
          </button>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Precio</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Unidad</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Proveedor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ingredientes.map((ingrediente) => (
                <tr key={ingrediente.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-medium">{ingrediente.nombre}</span>
                      {ingrediente.stockBajo && (
                        <AlertTriangle className="h-4 w-4 text-red-600 ml-2" title="Stock bajo" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">{ingrediente.precioUnit}€</td>
                  <td className="py-3 px-4">{ingrediente.unidad}</td>
                  <td className="py-3 px-4">
                    <span className={ingrediente.stockBajo ? 'text-red-600 font-medium' : ''}>
                      {ingrediente.stockActual}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{ingrediente.proveedor || '-'}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(ingrediente)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ingrediente.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingIngrediente ? 'Editar Ingrediente' : 'Añadir Ingrediente'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.precioUnit}
                  onChange={(e) => setFormData({ ...formData, precioUnit: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                <select
                  value={formData.unidad}
                  onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Seleccionar unidad</option>
                  <option value="kg">kg</option>
                  <option value="litro">litro</option>
                  <option value="unidad">unidad</option>
                  <option value="gramo">gramo</option>
                  <option value="mililitro">mililitro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Actual</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.stockActual}
                  onChange={(e) => setFormData({ ...formData, stockActual: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alerta Stock (mínimo)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.alertaStock}
                  onChange={(e) => setFormData({ ...formData, alertaStock: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                <input
                  type="text"
                  value={formData.proveedor}
                  onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
                  className="input"
                />
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="flex-1 btn btn-primary">
                  {editingIngrediente ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" onClick={handleCloseModal} className="flex-1 btn btn-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}