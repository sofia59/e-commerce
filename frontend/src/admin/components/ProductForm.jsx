export default function ProductForm({ formData, categorias = [], onChange, onSubmit, isEditing }) {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del producto"
              value={formData.nombre}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Categoría *</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={onChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group full">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            placeholder="Descripción del producto"
            value={formData.descripcion}
            onChange={onChange}
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Precio *</label>
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              step="0.01"
              value={formData.precio}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Precio Original</label>
            <input
              type="number"
              name="precioOriginal"
              placeholder="Precio original"
              step="0.01"
              value={formData.precioOriginal}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group full">
          <label>URL de Imagen</label>
          <input
            type="text"
            name="imagen"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={formData.imagen}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn-primary">
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
}