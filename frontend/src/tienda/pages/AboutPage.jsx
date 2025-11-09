import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Sobre RhodeSkin</h1>
          <p>Dedicados a tu belleza y bienestar</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h2>¿Quiénes Somos?</h2>
            <p>
              RhodeSkin es una tienda de productos de belleza y cuidado personal dedicada a ofrecer 
              los mejores productos naturales y científicamente probados. Desde 2020, hemos estado 
              comprometidos con la calidad y la satisfacción de nuestros clientes.
            </p>
          </div>

          <div className="about-section">
            <h2>Nuestra Misión</h2>
            <p>
              Proporcionar productos de cuidado personal de la más alta calidad, combinando ingredientes 
              naturales con fórmulas científicamente desarrolladas para brindarte resultados reales y visibles.
            </p>
          </div>

          <div className="about-section">
            <h2>Nuestros Valores</h2>
            <ul className="values-list">
              <li>✨ <strong>Calidad Premium:</strong> Todos nuestros productos cumplen con los más altos estándares</li>
              <li>🌿 <strong>Ingredientes Naturales:</strong> Utilizamos lo mejor de la naturaleza</li>
              <li>💚 <strong>Sostenibilidad:</strong> Comprometidos con el medio ambiente</li>
              <li>👥 <strong>Servicio al Cliente:</strong> Tu satisfacción es nuestra prioridad</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>¿Por Qué Elegirnos?</h2>
            <div className="why-choose-us">
              <div className="why-card">
                <h3>🚚 Envío Rápido</h3>
                <p>Entrega en 24-48 horas a todo el país</p>
              </div>
              <div className="why-card">
                <h3>💯 Garantía</h3>
                <p>Satisfacción garantizada o tu dinero de vuelta</p>
              </div>
              <div className="why-card">
                <h3>🔒 Seguro</h3>
                <p>Compras 100% seguras y protegidas</p>
              </div>
              <div className="why-card">
                <h3>📞 Soporte</h3>
                <p>Atención al cliente disponible 24/7</p>
              </div>
            </div>
          </div>

          <div className="about-section contact-section">
            <h2>Contacto</h2>
            <p>📧 Email: info@rhodeskin.com</p>
            <p>📱 Teléfono: +54 (011) 1234-5678</p>
            <p>📍 Ubicación: Buenos Aires, Argentina</p>
          </div>

          <div className="about-cta">
            <Link to="/shop" className="btn-shop">
              Explorar Tienda
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}