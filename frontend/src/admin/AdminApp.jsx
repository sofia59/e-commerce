import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CollectionsImagesPage from './pages/CollectionsImagesPage';

export default function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/admin/dashboard" /> : <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />}
      />
      <Route
        path="/dashboard/*"
        element={isLoggedIn ? <DashboardPage onLogout={() => { localStorage.removeItem('adminToken'); setIsLoggedIn(false); }} /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/collections"
        element={isLoggedIn ? <CollectionsImagesPage /> : <Navigate to="/admin/login" />}
      />
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
}