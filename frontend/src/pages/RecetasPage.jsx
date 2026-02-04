import { useState, useEffect } from 'react'
import { recetasApi } from '../services'
import { Utensils, Plus, Pencil, Trash2, Scale, Clock } from 'lucide-react'

export const RecetasPage = () => {
  const [recetas, setRecetas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [escaladoModal, setEscaladoModal] = useState(false)
  const [editingReceta, setEditingReceta] = useState(null)
  const [viewingReceta, setViewingReceta] = useState(null)
  const [escaladoReceta, setEscaladoReceta] = useState(null)
  const [porciones, setPorciones] = useState(4)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    porcionesBase: 4,
    tiempoPreparacion: '',
    dificultad: '',
    ingredientes: [],
    pasos: [],
  })

  useEffect(() => {
    loadRecetas()
  }, [])

  const loadRecetas = async () => {
    try {
      const response = await recetasApi.getAll()
      setRecetas(response.data)
    } catch (error) {
      console.error('Error loading recetas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = async (receta) => {
    try {
      const response = await recetasApi.getById(receta.id)
      setViewingReceta(response.data)
      setViewModal(true)
    } catch (error) {
      console.error('Error loading receta:', error)
    }
  }

  const handleEscalar = async (receta) => {
    try {
      const response = await recetasApi.escalar(receta.id, porciones)
      setEscaladoReceta(response.data)
      setEscaladoModal(true)
    } catch (error) {
      console.error('Error escalando receta:', error)
    }
  }

  const handleEdit = (receta) => {
    setEditingReceta(receta)
    setFormData({
      nombre: receta.nombre,
      descripcion: receta.descripcion || '',
      porcionesBase: receta.porcionesBase,
      tiempoPreparacion: receta.tiempoPreparacion || '',
      dificultad: receta.dificultad || '',
      ingredientes: receta.ingredientes || [],
      pasos: receta.pasos || [],
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta receta?')) {
      try {
        await recetasApi.delete(id)
        loadRecetas()
      } catch (error) {
        console.error('Error deleting receta:', error)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingReceta(null)
    setFormData({
      nombre: '',
      descripcion: '',
      porcionesBase: 4,
      tiempoPreparacion: '',
      dificultad: '',
      ingredientes: [],
      pasos: [],
    })
  }

  if (loading) {
    return <div className="text-center py-8">Cargando recetas...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recetas</h1>
          <p className="text-gray-600 mt-1">Gestiona tu libro de recetas</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Nueva Receta</span>
        </button>
      </div>

      {recetas.length === 0 ? (
        <div className="card text-center py-12">
          <Utensils className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No hay recetas registradas</p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            Crear Primera Receta
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recetas.map((receta) => (
            <div key={receta.id} className="card hover:shadow-lg transition-shadow">
              {receta.fotoUrl && (
                <img src={receta.fotoUrl} alt={receta.nombre} className="w-full h-48 object-cover rounded-t-lg" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{receta.nombre}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  {receta.tiempoPreparacion && (
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {receta.tiempoPreparacion} min
                    </span>
                  )}
                  {receta.dificultad && (
                    <span className="badge bg-gray-100 text-gray-700">{receta.dificultad}</span>
                  )}
                </div>
                {receta.costeTotal && (
                  <p className="text-sm text-gray-600 mb-3">
                    Coste total: <strong>{receta.costeTotal.toFixed(2)}€</strong>
                  </p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(receta)}
                    className="flex-1 btn btn-secondary text-sm"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handleEscalar(receta)}
                    className="flex-1 btn btn-primary text-sm flex items-center justify-center space-x-1"
                  >
                    <Scale className="h-4 w-4" />
                    <span>Escalar</span>
                  </button>
                  <button
                    onClick={() => handleEdit(receta)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(receta.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewModal && viewingReceta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{viewingReceta.nombre}</h2>
            {viewingReceta.descripcion && (
              <p className="text-gray-600 mb-4">{viewingReceta.descripcion}</p>
            )}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Ingredientes ({viewingReceta.porcionesBase} porciones)</h3>
              <ul className="space-y-2">
                {viewingReceta.ingredientes?.map((ing, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{ing.nombreIngrediente}</span>
                    <span>{ing.cantidad} {ing.unidad} - {ing.costoTotal.toFixed(2)}€</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-medium">Total: {viewingReceta.costeTotal?.toFixed(2)}€ ({viewingReceta.costePorPorcion?.toFixed(2)}€/porción)</p>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Pasos</h3>
              <ol className="space-y-2">
                {viewingReceta.pasos?.map((paso, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium mr-2">{paso.pasoNumero}.</span>
                    <span>{paso.descripcion}</span>
                  </li>
                ))}
              </ol>
            </div>
            <button onClick={() => setViewModal(false)} className="btn btn-secondary w-full">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {escaladoModal && escaladoReceta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {escaladoReceta.nombre} - {porciones} porciones
            </h2>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Ingredientes Escalados</h3>
              <ul className="space-y-2">
                {escaladoReceta.ingredientes?.map((ing, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{ing.nombreIngrediente}</span>
                    <span>{ing.cantidad} {ing.unidad} - {ing.costoTotal.toFixed(2)}€</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-medium">Total: {escaladoReceta.costeTotal?.toFixed(2)}€ ({escaladoReceta.costePorPorcion?.toFixed(2)}€/porción)</p>
            </div>
            <button onClick={() => setEscaladoModal(false)} className="btn btn-secondary w-full">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}