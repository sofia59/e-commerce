import { useState, useEffect } from 'react';
import { configAPI } from '../../services/api';

export default function ImageCarousel() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarImagenes();
  }, []);

  async function cargarImagenes() {
    try {
      const data = await configAPI.obtenerCarousel();
      if (Array.isArray(data)) {
        setSlides(data);
      } else {
        setSlides([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!Array.isArray(slides) || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, slides]);

  const prevSlide = () => {
    if (!Array.isArray(slides)) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    if (!Array.isArray(slides)) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (loading) {
    return <div className="carousel-container loading">Cargando...</div>;
  }

  if (!Array.isArray(slides) || slides.length === 0) {
    return <div className="carousel-container empty">Sin imágenes</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>

      <button className="carousel-btn prev" onClick={prevSlide}>
        ‹
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        ›
      </button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}