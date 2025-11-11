import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productosAPI } from '../../services/api';

export default function ProductDetailPage({ onAddCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await productosAPI.obtenerPublicoPorId(id);
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

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= producto.stock) {
      setCantidad(value);
    }
  };

  const handleAgregarAlCarrito = () => {
    if (producto.stock <= 0) {
      alert('❌ Producto agotado');
      return;
    }

    if (cantidad > producto.stock) {
      alert(`❌ Solo hay ${producto.stock} disponibles`);
      return;
    }

    for (let i = 0; i < cantidad; i++) {
      onAddCart(producto);
    }

    setCantidad(1);
  };

  const descuento = producto?.precioOriginal > 0
    ? Math.round((1 - producto.precio / producto.precioOriginal) * 100)
    : 0;

  if (loading) return <div className="p-4 text-center">⏳ Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!producto) return <div className="p-4">❌ Producto no encontrado</div>;

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          background: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ← Volver
      </button>

      <div style={{
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '40px' }}>

          <div>
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '300px',
                background: '#f0f0f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                💅
              </div>
            )}
          </div>

          <div>
            <p style={{ color: '#8B6F9E', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
              {producto.categoria}
            </p>

            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
              {producto.nombre}
            </h1>

            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
              {producto.descripcion}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#2e7d32'
              }}>
                ${parseFloat(producto.precio).toFixed(2)}
              </span>
              {producto.precioOriginal > 0 && (
                <>
                  <span style={{
                    fontSize: '18px',
                    color: '#999',
                    textDecoration: 'line-through'
                  }}>
                    ${parseFloat(producto.precioOriginal).toFixed(2)}
                  </span>
                  {descuento > 0 && (
                    <span style={{
                      background: '#e91e63',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      -${(parseFloat(producto.precioOriginal) - parseFloat(producto.precio)).toFixed(2)}
                    </span>
                  )}
                </>
              )}
            </div>

            <div style={{
              padding: '15px',
              background: producto.stock > 0 ? '#e8f5e9' : '#ffebee',
              borderRadius: '8px',
              marginBottom: '20px',
              color: producto.stock > 0 ? '#2e7d32' : '#c62828',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              {producto.stock > 0 ? (
                <>✅ {producto.stock} disponibles</>
              ) : (
                <>❌ Agotado</>
              )}
            </div>

            {producto.stock > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Cantidad:
                </label>
                <select
                  value={cantidad}
                  onChange={handleCantidadChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #8B6F9E',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {Array.from({ length: Math.min(10, producto.stock) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {producto.stock > 0 && (
              <div style={{
                padding: '15px',
                background: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 'bold', color: '#666' }}>Subtotal:</span>
                <span style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#2e7d32'
                }}>
                  ${(parseFloat(producto.precio) * cantidad).toFixed(2)}
                </span>
              </div>
            )}

            <button
              onClick={handleAgregarAlCarrito}
              disabled={producto.stock <= 0}
              style={{
                width: '100%',
                padding: '15px',
                background: producto.stock > 0 ? '#8B6F9E' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: producto.stock > 0 ? 'pointer' : 'not-allowed',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => {
                if (producto.stock > 0) e.target.style.background = '#6b5577';
              }}
              onMouseLeave={(e) => {
                if (producto.stock > 0) e.target.style.background = '#8B6F9E';
              }}
            >
              {producto.stock > 0 ? '🛒 Agregar al Carrito' : '❌ Agotado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}