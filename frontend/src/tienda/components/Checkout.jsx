import { useState } from 'react';
import { pedidosAPI } from '../../services/api';

export default function Checkout({ items, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    clienteNombre: '',
    clienteEmail: '',
    clienteTelefono: '',
    clienteDireccion: '',
  });
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + (parseFloat(item.precio) || 0) * item.cantidad, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await pedidosAPI.crear({
        ...formData,
        items: items.map((item) => ({
          productoId: item.id,
          cantidad: item.cantidad,
        })),
      });

      alert(`✅ Pedido #${response.data.pedidoId} creado correctamente`);
      onSuccess();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="checkout-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>✕</button>
        <h2>Completar Compra</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo *</label>
            <input
              type="text"
              name="clienteNombre"
              value={formData.clienteNombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="clienteEmail"
              value={formData.clienteEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              name="clienteTelefono"
              value={formData.clienteTelefono}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Dirección *</label>
            <textarea
              name="clienteDireccion"
              value={formData.clienteDireccion}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="resumen">
            <h4>Resumen:</h4>
            {items.map((item) => (
              <div key={item.id} className="resumen-item">
                <span>{item.nombre} x{item.cantidad}</span>
                <span>${(item.cantidad * item.precio).toFixed(2)}</span>
              </div>
            ))}
            <div className="resumen-total">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="modal-buttons">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}