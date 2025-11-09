import { useNavigate } from 'react-router-dom';

export default function AdminHeader({ onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('adminToken');
    onLogout();
    navigate('/login');
  }

  return (
    <header className="admin-header">
      <div className="header-content">
        <h1>📊 Panel Admin - RhodeSkin</h1>
        <button onClick={handleLogout} className="btn-logout">
          🚪 Cerrar Sesión
        </button>
      </div>
    </header>
  );
}