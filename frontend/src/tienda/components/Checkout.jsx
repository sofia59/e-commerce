import { useState } from 'react';
import { pedidosAPI, productosAPI } from '../../services/api';

export default function Checkout({ items, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    clienteNombre: '',
    clienteEmail: '',
    clienteTelefono: '',
    clienteDireccion: '',
  });
  const [loading, setLoading] = useState(false);
  const [validando, setValidando] = useState(false);
  const [erroresStock, setErroresStock] = useState([]);
  const [stockValido, setStockValido] = useState(false);

  const total = items.reduce((sum, item) => sum + (parseFloat(item.precio) || 0) * item.cantidad, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function validarStockDisponible() {
    setValidando(true);
    setErroresStock([]);
    
    try {
      const itemsParaValidar = items.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
      }));

      const response = await productosAPI.validarStock(itemsParaValidar);

      if (!response.data.valido) {
        const errores = response.data.items
          .filter(item => !item.valido)
          .map(item => item.mensaje);
        setErroresStock(errores);
        setStockValido(false);
        return false;
      }

      setStockValido(true);
      return true;
    } catch (error) {
      setErroresStock(['Error validando stock']);
      setStockValido(false);
      return false;
    } finally {
      setValidando(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const stockOk = await validarStockDisponible();
    if (!stockOk) {
      return;
    }

    setLoading(true);

    try {
      const response = await pedidosAPI.crearPedido({
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

        {erroresStock.length > 0 && (
          <div className="error-alert" style={{
            background: '#ffebee',
            border: '1px solid #ef5350',
            borderRadius: '5px',
            padding: '12px',
            marginBottom: '15px',
            color: '#c62828'
          }}>
            <strong>⚠️ Problemas con el stock:</strong>
            <ul style={{ marginTop: '8px', marginBottom: '0' }}>
              {erroresStock.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {stockValido && (
          <div className="success-alert" style={{
            background: '#e8f5e9',
            border: '1px solid #4caf50',
            borderRadius: '5px',
            padding: '12px',
            marginBottom: '15px',
            color: '#2e7d32'
          }}>
            ✅ Stock verificado. Puedes proceder con la compra.
          </div>
        )}

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
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading || validando}
            >
              {loading ? 'Procesando...' : validando ? 'Validando stock...' : 'Confirmar Compra'}
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