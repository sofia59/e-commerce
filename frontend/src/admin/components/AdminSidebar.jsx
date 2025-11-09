import { useNavigate } from 'react-router-dom';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${activeTab === 'productos' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('productos');
            navigate('/admin/dashboard/productos');
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '15px 20px' }}
        >
          📦 Productos
        </button>
        <button 
          className={`nav-item ${activeTab === 'categorias' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('categorias');
            navigate('/admin/dashboard/categorias');
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '15px 20px' }}
        >
          📂 Categorías
        </button>
        <button 
          className={`nav-item ${activeTab === 'pedidos' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('pedidos');
            navigate('/admin/dashboard/pedidos');
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '15px 20px' }}
        >
          📋 Pedidos
        </button>
        <button 
          className={`nav-item ${activeTab === 'imagenes' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('imagenes');
            navigate('/admin/dashboard/imagenes');
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '15px 20px' }}
        >
          🖼️ Imágenes
        </button>
      </nav>
    </aside>
  );
}