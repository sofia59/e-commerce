import { Link } from 'react-router-dom';

export default function Navbar({ carritoCount = 0, onCartClick }) {
  return (
    <div>
      <div className="header-top">
        Envío gratis en compras mayores a $100
      </div>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="logo">
            🌸 RhodeSkin
          </Link>
          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/shop">Todos los Productos</Link></li>
            <li><Link to="/about">Sobre Nosotros</Link></li>
          </ul>
          <div className="nav-icons">
            <input type="text" className="search" placeholder="Buscar..." />
            <button className="cart-btn" onClick={onCartClick}>
              🛒
              {carritoCount > 0 && <span className="cart-count">{carritoCount}</span>}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}