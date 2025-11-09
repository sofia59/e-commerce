import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🕯️ Tienda de Velas
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/productos" className="nav-link">Productos</Link>
          </li>
          
          {user ? (
            <>
              {user?.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">⚙️ Admin</Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/carrito" className="nav-link">🛒 Carrito</Link>
              </li>
              <li className="nav-item">
                <Link to="/mis-pedidos" className="nav-link">Mis Pedidos</Link>
              </li>
              <li className="nav-item">
                <span className="nav-user">Hola, {user.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};