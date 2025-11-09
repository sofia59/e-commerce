import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const [images, setImages] = useState({
    maquillajes: null,
    perfumes: null,
    accesorios: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/collections/images');
        const imageMap = {};
        
        response.data.forEach(img => {
          imageMap[img.category] = img.imageUrl;
        });
        
        setImages(imageMap);
      } catch (error) {
        console.log('Error cargando imágenes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-main">
        <div className="hero-content">
          <h1>Cuidado Premium para tu Piel</h1>
          <p>Productos naturales y científicamente probados</p>
          <Link to="/shop" className="btn-shop">
            Explorar Tienda
          </Link>
        </div>
      </section>

      {/* Sección de Categorías */}
      <section className="categories-section">
        <h2>Nuestras Colecciones</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-image maquillajes">
              {images.maquillajes ? (
                <img src={images.maquillajes} alt="Maquillajes" />
              ) : (
                <div style={{ color: '#999' }}>Sin imagen</div>
              )}
            </div>
            <h3>Maquillajes</h3>
            <Link to="/shop" state={{ categoria: 'Maquillajes' }}>
              Ver Colección →
            </Link>
          </div>

          <div className="category-card">
            <div className="category-image perfumes">
              {images.perfumes ? (
                <img src={images.perfumes} alt="Perfumes" />
              ) : (
                <div style={{ color: '#999' }}>Sin imagen</div>
              )}
            </div>
            <h3>Perfumes</h3>
            <Link to="/shop" state={{ categoria: 'Perfumes' }}>
              Ver Colección →
            </Link>
          </div>

          <div className="category-card">
            <div className="category-image accesorios">
              {images.accesorios ? (
                <img src={images.accesorios} alt="Accesorios" />
              ) : (
                <div style={{ color: '#999' }}>Sin imagen</div>
              )}
            </div>
            <h3>Accesorios</h3>
            <Link to="/shop" state={{ categoria: 'Accesorios' }}>
              Ver Colección →
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="benefits-section">
        <div className="benefit">
          <h3>✨ Calidad Premium</h3>
          <p>Productos de la más alta calidad</p>
        </div>
        <div className="benefit">
          <h3>🚚 Envío Rápido</h3>
          <p>Entrega en 24-48 horas</p>
        </div>
        <div className="benefit">
          <h3>💝 Garantía</h3>
          <p>Satisfacción garantizada o tu dinero de vuelta</p>
        </div>
      </section>
    </div>
  );
}