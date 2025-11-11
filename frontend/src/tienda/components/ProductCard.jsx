import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddCart }) {
  const precioActual = parseFloat(product.precio) || 0;
  const precioOriginal = parseFloat(product.precioOriginal) || 0;
  
  const descuento = precioOriginal > 0
    ? Math.round((1 - precioActual / precioOriginal) * 100)
    : 0;

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} className="product-image-link">
        <div className="product-image">
          {product.imagen ? (
            <img src={product.imagen} alt={product.nombre} />
          ) : (
            <div className="product-image-placeholder">💅</div>
          )}
          {descuento > 0 && <span className="badge">-{descuento}%</span>}
        </div>
      </Link>

      <div className="product-info">
        <p className="product-category">{product.categoria}</p>

        <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="product-name">{product.nombre}</h3>
        </Link>
        
        <p className="product-description">{product.descripcion}</p>

        <div className="product-price">
          <span className="price-current">${precioActual.toFixed(2)}</span>
          {precioOriginal > 0 && (
            <span className="price-original">${precioOriginal.toFixed(2)}</span>
          )}
        </div>

        <p className="product-stock">
          {product.stock === 0 ? '❌ Agotado' : `✅ ${product.stock} disponibles`}
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link 
            to={`/producto/${product.id}`}
            style={{
              flex: 1,
              padding: '10px',
              textAlign: 'center',
              background: '#8B6F9E',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'background 0.3s'
            }}
            className="btn-view-detail"
          >
            👁️ Ver Detalle
          </Link>

          <button
            className="btn-add"
            onClick={() => onAddCart(product)}
            disabled={product.stock === 0}
            style={{
              flex: 1,
              padding: '10px',
              background: product.stock === 0 ? '#ccc' : '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.3s'
            }}
          >
            🛒 Agregar
          </button>
        </div>
      </div>

      <style>{`
        .btn-view-detail:hover {
          background: #6b5577 !important;
        }
        
        .btn-add:hover:not(:disabled) {
          background: #c2185b !important;
        }
      `}</style>
    </div>
  );
}