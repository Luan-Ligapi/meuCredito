import React, { useState, useEffect } from 'react';
import './App.css';
import { login, getAuthToken } from './services/auth';
import Tabela from './components/Tabela'; // Importando o componente Tabela

const App: React.FC = () => {
  const [contratos, setContratos] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = await login('admin', 'admin');
        console.log('Logged in with token:', token);
        setToken(token);
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    if (!getAuthToken()) {
      authenticate();
    } else {
      const authToken = getAuthToken();
      if (authToken) {
        setToken(authToken);
      }
    }
  }, []);

  useEffect(() => {
    const fetchContratos = async () => {
      if (!token) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/debt/historico', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os contratos');
        }

        const data = await response.json();
        setContratos(data);
      } catch (error) {
        setError('Erro ao buscar os contratos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="titulo">Histórico de Compras</h1>
        {loading && <p>Carregando...</p>}
        {error && <p className="erro">{error}</p>}
        {contratos.length > 0 && <Tabela contratos={contratos} />}
      </header>
    </div>
  );
};

export default App;
