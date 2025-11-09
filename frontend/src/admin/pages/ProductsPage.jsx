import { useState, useEffect } from 'react';
import { productosAPI } from '../../services/api';
import { categoriasAPI } from '../../services/api';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    precioOriginal: '',
    categoria: '',
    stock: '',
    imagen: '',
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      setLoading(true);
      const [productosRes, categoriasRes] = await Promise.all([
        productosAPI.obtenerTodos(),
        categoriasAPI.obtenerTodas()
      ]);
      setProductos(productosRes.data);
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar datos: ' + error.message);
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
        await productosAPI.actualizar(editId, formData);
        alert('✅ Producto actualizado');
      } else {
        await productosAPI.crear(formData);
        alert('✅ Producto creado');
      }

      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        precioOriginal: '',
        categoria: '',
        stock: '',
        imagen: '',
      });
      setShowForm(false);
      setEditId(null);
      cargarDatos();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  }

  async function handleDelete(id) {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await productosAPI.eliminar(id);
        alert('✅ Producto eliminado');
        cargarDatos();
      } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      }
    }
  }

  function handleEdit(product) {
    setFormData(product);
    setEditId(product.id);
    setShowForm(true);
  }

  function handleCancel() {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      precioOriginal: '',
      categoria: '',
      stock: '',
      imagen: '',
    });
    setShowForm(false);
    setEditId(null);
  }

  if (loading) {
    return <div className="page-products"><p>Cargando productos...</p></div>;
  }

  return (
    <div className="page-products">
      <div className="page-header">
        <h2>📦 Gestionar Productos</h2>
        <button 
          className="btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancelar' : '➕ Nuevo Producto'}
        </button>
      </div>

      {showForm && (
        <ProductForm
          formData={formData}
          categorias={categorias}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isEditing={!!editId}
        />
      )}

      <ProductTable
        productos={productos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}