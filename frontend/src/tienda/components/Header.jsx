import { Link, useNavigate } from 'react-router-dom';
import '../styles/tienda.css';

export default function Header({ cartCount, onCartClick }) {
  const navigate = useNavigate();

  const handleCategoryClick = (categoria) => {
    navigate('/shop', { state: { categoria } });
  };

  return (
    <header className="header">
      <div className="header-top">
        <p>Envío gratis en compras mayores a $100</p>
      </div>

      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="logo">✨ RhodeSkin</Link>

          <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/shop">Todos los Productos</Link></li>
          </ul>

          <div className="nav-icons">
            <input type="text" placeholder="Buscar..." className="search" />
            <button className="cart-btn" onClick={onCartClick}>
              🛒 <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}