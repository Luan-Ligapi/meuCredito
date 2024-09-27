import React, { useState, useEffect } from 'react';
import './App.css';
import { login, getAuthToken } from './services/auth';
import Tabela from './components/Tabela'; 
import DocumentationHeader from './components/Documentation';
import CalculateDebtButton from './components/CalculateDebtButton';
import Header from './components/Header'; 

const App: React.FC = () => {
  const [contratos, setContratos] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debtResult, setDebtResult] = useState<{ month: string; maxDebt: number } | null>(null);

  const calculateDebt = async () => {
    const payload = {
      contratos: contratos.map(contrato => ({
        contrato: contrato.contrato,
        data: contrato.data,
        parcelas: contrato.parcelas,
        valorentrada: 0,
        valorfinanciado: contrato.valorfiananciado,
        valortotal: contrato.valortotal
      }))
    };

    if (!Array.isArray(contratos) || contratos.length === 0) {
      console.error('Formato de entrada inválido: contratos ausentes ou não é um array.');
      return;
    }

    const response = await fetch('http://localhost:4000/api/debt/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Resultado da dívida:', data);
      setDebtResult(data);
    } else {
      console.error('Erro ao calcular a dívida');
    }
  };

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
        const response = await fetch('http://localhost:4000/api/debt/historico', {
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
      <Header />
      <div className="container">
        <header className="App-header">
          <DocumentationHeader />
        </header>
        <section className="calculate-section">
          <CalculateDebtButton onCalculate={calculateDebt} />
          <div className="resultado-calculo">
            {debtResult && (
              <div>
                <h3>Resultado do Cálculo da Dívida</h3>
                <p>Mês: {debtResult.month}</p>
                <p>Máxima Dívida: R$ {debtResult.maxDebt.toFixed(2)}</p>
              </div>
            )}
          </div>
        </section>
        <section>
          {loading && <p>Carregando...</p>}
          {error && <p className="erro">{error}</p>}
          {contratos.length > 0 && <Tabela contratos={contratos} />}
        </section>
      </div>
    </div>
  );
};

export default App;
