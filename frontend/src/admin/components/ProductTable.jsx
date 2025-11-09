export default function ProductTable({ productos, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">No hay productos</td>
            </tr>
          ) : (
            productos.map((p) => (
              <tr key={p.id}>
                <td>#{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria || '-'}</td>
                <td>${parseFloat(p.precio).toFixed(2)}</td>
                <td>{p.stock}</td>
                <td className="actions">
                  <button className="btn-edit" onClick={() => onEdit(p)}>✏️ Editar</button>
                  <button className="btn-delete" onClick={() => onDelete(p.id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}