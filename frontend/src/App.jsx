import React from 'react';

function App() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#1e1e2e',
      color: '#cdd6f4',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: '#313244',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        border: '1px solid #45475a'
      }}>
        <h1 style={{ color: '#89b4fa', marginBottom: '10px', fontSize: '2.5rem' }}>🚀 Proyecto Sergio</h1>
        <h3 style={{ color: '#a6e3a1', marginTop: '0', fontWeight: '500' }}>¡Estructura Frontend Lista!</h3>
        <p style={{ color: '#bac2de', lineHeight: '1.6', fontSize: '1.1rem' }}>
          La arquitectura por capas se ha montado correctamente. El puente de conexión de Axios ya está preparado para hablar con el backend.
        </p>
        <div style={{
          backgroundColor: '#181825',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '0.95rem',
          fontFamily: 'monospace',
          color: '#f38ba8',
          marginTop: '25px',
          display: 'inline-block',
          border: '1px solid #f38ba8'
        }}>
          Estado: Base lista para programar pantallas
        </div>
      </div>
    </div>
  );
}

export default App;