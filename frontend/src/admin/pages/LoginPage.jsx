import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import '../styles/admin.css';

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@tienda.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('adminToken', response.data.token);
      onLoginSuccess();
      navigate('/admin/dashboard/productos');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Panel Admin</h1>
        <p className="subtitle">Gestiona tu tienda</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? '⏳ Cargando...' : '🚀 Iniciar Sesión'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="demo-info">
          <p>📧 Demo: admin@tienda.com</p>
          <p>🔐 Contraseña: admin123</p>
        </div>
      </div>
    </div>
  );
}