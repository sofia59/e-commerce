import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/productos/${id}`);
        setProducto(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!producto) return <div className="p-4">Producto no encontrado</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Precio</p>
            <p className="text-2xl font-bold text-green-600">${producto.precio}</p>
          </div>
          <div>
            <p className="text-gray-600">Stock</p>
            <p className="text-2xl font-bold">{producto.stock}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">Descripción</p>
          <p className="text-gray-800">{producto.descripcion}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">Categoría</p>
          <p className="text-gray-800">{producto.categoria}</p>
        </div>

        {producto.imagen && (
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Imagen</p>
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              className="w-full max-w-md h-auto rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}