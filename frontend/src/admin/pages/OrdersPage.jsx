import { useState, useEffect } from 'react';
import { pedidosAPI } from '../../services/api';

export default function OrdersPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('OrdersPage montado');
    cargarPedidos();
  }, []);

  async function cargarPedidos() {
    try {
      console.log('Iniciando carga de pedidos...');
      const response = await pedidosAPI.obtenerTodos();
      console.log('Respuesta del servidor:', response);
      console.log('Pedidos:', response.data);
      setPedidos(response.data || []);
      setError('');
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Mensaje:', error.message);
      setError('Error al cargar pedidos: ' + error.message);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  }

  async function cambiarEstado(id, nuevoEstado) {
    try {
      await pedidosAPI.actualizarEstado(id, nuevoEstado);
      cargarPedidos();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  return (
    <div className="page-orders">
      <h2>📋 Mis Pedidos</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading && <p>Cargando...</p>}

      {!loading && pedidos.length === 0 && <p>No hay pedidos</p>}

      {!loading && pedidos.length > 0 && (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.clienteNombre}</td>
                  <td>{p.clienteEmail}</td>
                  <td>${parseFloat(p.total).toFixed(2)}</td>
                  <td>
                    <select value={p.estado} onChange={(e) => cambiarEstado(p.id, e.target.value)}>
                      <option value="pendiente">Pendiente</option>
                      <option value="procesando">Procesando</option>
                      <option value="completado">Completado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                  <td>{new Date(p.createdAt).toLocaleDateString('es-ES')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}