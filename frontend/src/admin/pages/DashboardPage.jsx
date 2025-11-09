import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import ProductsPage from './ProductsPage';
import OrdersPage from './OrdersPage';
import CollectionsImagesPage from './CollectionsImagesPage';
import CategoriesPage from './CategoriesPage';
import '../styles/admin.css';

export default function DashboardPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState('productos');

  return (
    <div className="admin-container">
      <AdminHeader onLogout={onLogout} />
      
      <div className="admin-content">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="admin-main">
          <Routes>
            <Route path="productos" element={<ProductsPage />} />
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="imagenes" element={<CollectionsImagesPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
            <Route path="*" element={<ProductsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}