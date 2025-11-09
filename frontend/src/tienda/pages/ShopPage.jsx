import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productosAPI } from '../../services/api';
import ProductCard from '../components/ProductCard';

export default function ShopPage({ onAddCart }) {
  const location = useLocation();
  const [productos, setProductos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [categoria, setCategoria] = useState(location.state?.categoria || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    if (location.state?.categoria) {
      setCategoria(location.state.categoria);
      filtrar(location.state.categoria);
    }
  }, [location.state?.categoria]);

  async function cargarProductos() {
    try {
      console.log('Cargando productos...');
      const response = await productosAPI.obtenerPublicos();
      console.log('Productos obtenidos:', response.data);
      setProductos(response.data);
      setFiltrados(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  function filtrar(cat) {
    setCategoria(cat);
    if (cat === '') {
      setFiltrados(productos);
    } else {
      setFiltrados(productos.filter((p) => p.categoria === cat));
    }
  }

  if (loading) return <p className="loading">Cargando productos...</p>;

  return (
    <div className="shop">
      <div className="container">
        <h2>Nuestros Productos</h2>

        <div className="filters">
          <select value={categoria} onChange={(e) => filtrar(e.target.value)}>
            <option value="">Todas las categorías</option>
            <option value="Maquillajes">💄 Maquillajes</option>
            <option value="Perfumes">🌸 Perfumes</option>
            <option value="Accesorios">✨ Accesorios</option>
          </select>
        </div>

        <div className="grid">
          {filtrados.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            filtrados.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddCart={onAddCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}