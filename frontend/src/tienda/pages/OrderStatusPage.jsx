import { useState } from 'react';
import { pedidosAPI } from '../../services/api';

export default function OrderStatusPage() {
  const [pedidoId, setPedidoId] = useState('');
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleBuscar(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await pedidosAPI.obtenerPorId(parseInt(pedidoId));
      setPedido(response.data);
    } catch (err) {
      setError('Pedido no encontrado');
      setPedido(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="order-status">
      <div className="container">
        <h2>Seguimiento de Pedidos</h2>

        <form onSubmit={handleBuscar} className="search-form">
          <input
            type="number"
            placeholder="Ingresa el número de tu pedido"
            value={pedidoId}
            onChange={(e) => setPedidoId(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {pedido && (
          <div className="order-details">
            <h3>Pedido #{pedido.id}</h3>
            
            <div className="status-info">
              <div className="info-item">
                <strong>Cliente:</strong> {pedido.clienteNombre}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {pedido.clienteEmail}
              </div>
              <div className="info-item">
                <strong>Teléfono:</strong> {pedido.clienteTelefono || 'No especificado'}
              </div>
              <div className="info-item">
                <strong>Dirección:</strong> {pedido.clienteDireccion}
              </div>
              <div className="info-item">
                <strong>Total:</strong> ${pedido.total.toFixed(2)}
              </div>
              <div className="info-item">
                <strong>Fecha:</strong> {new Date(pedido.createdAt).toLocaleDateString('es-ES')}
              </div>
            </div>

            <div className={`status-badge status-${pedido.estado}`}>
                 Estado: <strong>{pedido.estado.toUpperCase()}</strong>
            </div>

            <div className="order-items">
              <h4>Productos:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Producto ID</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.items.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.productoId}</td>
                      <td>{item.cantidad}</td>
                      <td>${parseFloat(item.precioUnitario).toFixed(2)}</td>
                      <td>${(parseFloat(item.precioUnitario) * item.cantidad).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}