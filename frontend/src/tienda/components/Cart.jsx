export default function Cart({ items, onRemove, onCheckout, isOpen, onClose }) {
  const total = items.reduce((sum, item) => sum + (parseFloat(item.precio) || 0) * item.cantidad, 0);

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Tu Carrito</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.nombre}</h4>
                  <p>{item.cantidad} x ${(parseFloat(item.precio) || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="item-price">${((parseFloat(item.precio) || 0) * item.cantidad).toFixed(2)}</p>
                  <button onClick={() => onRemove(item.id)} className="btn-remove">✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <strong>Total:</strong>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="btn-checkout"
            onClick={onCheckout}
            disabled={items.length === 0}
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </>
  );
}