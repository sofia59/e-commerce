import { useState } from 'react';
import axios from 'axios';

export default function CollectionsImagesPage() {
  const [images, setImages] = useState({
    maquillajes: null,
    perfumes: null,
    accesorios: null
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (e, category) => {
    const file = e.target.files[0];
    if (file) {
      setImages(prev => ({
        ...prev,
        [category]: file
      }));
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      
      if (images.maquillajes) formData.append('files', images.maquillajes);
      if (images.perfumes) formData.append('files', images.perfumes);
      if (images.accesorios) formData.append('files', images.accesorios);

      const response = await axios.post('http://localhost:3000/collections/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('✓ Imágenes subidas exitosamente');
      setImages({ maquillajes: null, perfumes: null, accesorios: null });
    } catch (error) {
      setMessage('✗ Error al subir imágenes: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>Gestionar Imágenes de Colecciones</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '30px' }}>
        {['maquillajes', 'perfumes', 'accesorios'].map((category) => (
          <div key={category} style={{ border: '2px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ textTransform: 'capitalize', marginBottom: '15px', color: '#8B6F9E' }}>
              {category}
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, category)}
              style={{ marginBottom: '15px', display: 'block', width: '100%' }}
            />
            {images[category] && (
              <p style={{ color: 'green', fontSize: '12px', marginTop: '10px' }}>
                ✓ {images[category].name} ({(images[category].size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || !Object.values(images).some(img => img)}
        style={{
          marginTop: '30px',
          padding: '12px 30px',
          background: Object.values(images).some(img => img) ? '#8B6F9E' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: Object.values(images).some(img => img) ? 'pointer' : 'not-allowed',
          fontSize: '16px',
          fontWeight: '600'
        }}
      >
        {loading ? 'Subiendo...' : 'Subir Imágenes'}
      </button>

      {message && (
        <p style={{
          marginTop: '15px',
          padding: '12px',
          background: message.includes('✗') ? '#ffebee' : '#e8f5e9',
          color: message.includes('✗') ? '#c62828' : '#2e7d32',
          borderRadius: '5px',
          borderLeft: '4px solid ' + (message.includes('✗') ? '#c62828' : '#2e7d32')
        }}>
          {message}
        </p>
      )}
    </div>
  );
}