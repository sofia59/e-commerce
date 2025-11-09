export default function ProductCard({ product, onAddCart }) {
  const precioActual = parseFloat(product.precio) || 0;
  const precioOriginal = parseFloat(product.precioOriginal) || 0;
  
  const descuento = precioOriginal > 0
    ? Math.round((1 - precioActual / precioOriginal) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image">
        {product.imagen ? (
          <img src={product.imagen} alt={product.nombre} />
        ) : (
          <div className="product-image-placeholder">💅</div>
        )}
        {descuento > 0 && <span className="badge">-{descuento}%</span>}
      </div>

      <div className="product-info">
        <p className="product-category">{product.categoria}</p>
        <h3 className="product-name">{product.nombre}</h3>
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

        <button
          className="btn-add"
          onClick={() => onAddCart(product)}
          disabled={product.stock === 0}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}