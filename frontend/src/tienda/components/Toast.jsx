import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const backgroundColor = type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3';
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: backgroundColor,
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 9999,
        animation: 'slideIn 0.3s ease-in-out',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <span>{icon}</span>
      <span>{message}</span>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}