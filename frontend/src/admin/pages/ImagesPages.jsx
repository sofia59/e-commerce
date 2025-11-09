import { useState, useEffect } from 'react';
import { configAPI } from '../../services/api';

export default function ImagesPage() {
  const [carousel, setCarousel] = useState([]);
  const [colecciones, setColecciones] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    cargarImagenes();
  }, []);

  async function cargarImagenes() {
    try {
      const carouselData = await configAPI.obtenerCarousel();
      setCarousel(Array.isArray(carouselData) ? carouselData : []);

      const coleccionesData = await configAPI.obtenerColecciones();
      setColecciones(coleccionesData || {});
    } catch (error) {
      console.error('Error:', error);
      setCarousel([]);
      setColecciones({});
    } finally {
      setLoading(false);
    }
  }

  async function guardarCarousel() {
    try {
      await configAPI.guardarCarousel(carousel);
      setSuccess('✅ Carrusel guardado');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  async function guardarColecciones() {
    try {
      await configAPI.guardarColecciones(colecciones);
      setSuccess('✅ Colecciones guardadas');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  const handleCarouselChange = (index, value) => {
    const newCarousel = [...carousel];
    newCarousel[index] = value;
    setCarousel(newCarousel);
  };

  const handleColeccionChange = (categoria, value) => {
    setColecciones({ ...colecciones, [categoria]: value });
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="page-images">
      <h2>🖼️ Gestión de Imágenes</h2>

      {success && <p className="success-message">{success}</p>}

      {/* CARRUSEL */}
      <div className="images-section">
        <h3>Carrusel Principal</h3>
        <p className="section-desc">Agregá 3 URLs de imágenes para el carrusel de la página principal</p>

        <div className="images-form">
          {Array.isArray(carousel) && carousel.map((url, index) => (
            <div key={index} className="image-input-group">
              <label>Imagen {index + 1}</label>
              <input
                type="text"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={url || ''}
                onChange={(e) => handleCarouselChange(index, e.target.value)}
              />
              {url && (
                <div className="image-preview">
                  <img src={url} alt={`Carrusel ${index + 1}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="btn-save" onClick={guardarCarousel}>
          💾 Guardar Carrusel
        </button>
      </div>

      {/* COLECCIONES */}
      <div className="images-section">
        <h3>Imágenes de Colecciones</h3>
        <p className="section-desc">Agregá las URLs para cada categoría</p>

        <div className="images-form">
          {Object.keys(colecciones).map((categoria) => (
            <div key={categoria} className="image-input-group">
              <label>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</label>
              <input
                type="text"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={colecciones[categoria] || ''}
                onChange={(e) => handleColeccionChange(categoria, e.target.value)}
              />
              {colecciones[categoria] && (
                <div className="image-preview">
                  <img src={colecciones[categoria]} alt={categoria} />
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="btn-save" onClick={guardarColecciones}>
          💾 Guardar Colecciones
        </button>
      </div>
    </div>
  );
}