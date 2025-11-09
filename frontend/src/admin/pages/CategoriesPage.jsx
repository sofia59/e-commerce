import { useState, useEffect } from 'react';
import { categoriasAPI } from '../../services/api';

export default function CategoriesPage() {
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  async function cargarCategorias() {
    try {
      setLoading(true);
      const response = await categoriasAPI.obtenerTodas();
      setCategorias(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar categorías: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editId) {
        await categoriasAPI.actualizar(editId, formData);
        alert('✅ Categoría actualizada');
      } else {
        await categoriasAPI.crear(formData);
        alert('✅ Categoría creada');
      }

      setFormData({
        nombre: '',
        descripcion: '',
      });
      setShowForm(false);
      setEditId(null);
      cargarCategorias();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  }

  async function handleDelete(id) {
    if (window.confirm('¿Eliminar esta categoría?')) {
      try {
        await categoriasAPI.eliminar(id);
        alert('✅ Categoría eliminada');
        cargarCategorias();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
    }
  }

  function handleEdit(categoria) {
    setFormData(categoria);
    setEditId(categoria.id);
    setShowForm(true);
  }

  function handleCancel() {
    setFormData({
      nombre: '',
      descripcion: '',
    });
    setShowForm(false);
    setEditId(null);
  }

  if (loading) {
    return <div className="page-products"><p>Cargando categorías...</p></div>;
  }

  return (
    <div className="page-products">
      <div className="page-header">
        <h2>📂 Gestionar Categorías</h2>
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancelar' : '➕ Nueva Categoría'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#f9f7f4', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>{editId ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div>
                <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', minHeight: '100px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  {editId ? 'Actualizar' : 'Crear'}
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel}
                  style={{ flex: 1, background: '#95a5a6', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#8B6F9E', color: 'white' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Nombre</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Descripción</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria, index) => (
              <tr key={categoria.id} style={{ borderBottom: '1px solid #ddd', background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={{ padding: '15px' }}>{categoria.id}</td>
                <td style={{ padding: '15px' }}>{categoria.nombre}</td>
                <td style={{ padding: '15px' }}>{categoria.descripcion || '-'}</td>
                <td style={{ padding: '15px', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button
                    onClick={() => handleEdit(categoria)}
                    style={{ background: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id)}
                    style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}