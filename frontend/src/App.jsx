import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './tienda/pages/HomePage';
import ShopPage from './tienda/pages/ShopPage';
import AboutPage from './tienda/pages/AboutPage';
import ProductDetailPage from "./admin/pages/ProductDetailPage";
import Checkout from './tienda/components/Checkout';
import Cart from './tienda/components/Cart';
import AdminApp from './admin/AdminApp';
import OrderStatusPage from './tienda/pages/OrderStatusPage';
import Navbar from './tienda/components/Navbar';
import "./App.css";

export default function App() {
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }

  function eliminarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <>
      <Navbar 
        carritoCount={carrito.length} 
        onCartClick={() => setCartOpen(true)}
      />
      
      <Cart
        items={carrito}
        onRemove={eliminarDelCarrito}
        onCheckout={() => {
          setCartOpen(false);
          setShowCheckout(true);
        }}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      {showCheckout && (
        <Checkout
          items={carrito}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setCarrito([]);
            setShowCheckout(false);
            alert('¡Gracias por tu compra!');
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage onAddCart={agregarAlCarrito} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage onAddCart={agregarAlCarrito} />} />
        <Route path="/checkout" element={<Checkout items={carrito} onRemove={eliminarDelCarrito} />} />
        <Route path="/pedidos/:id" element={<OrderStatusPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}