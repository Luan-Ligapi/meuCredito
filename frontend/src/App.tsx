import React, { useState } from 'react';
import './App.css';  // Aplicando estilos conforme o design system

interface Resultado {
  mesMaxDivida: string;
  maxDivida: number;
}

const App: React.FC = () => {
  const [historico, setHistorico] = useState([
    { data: '2023-01', tipo: 'compra', valor: 500 },
    { data: '2023-02', tipo: 'pagamento', valor: 200 },
    { data: '2023-03', tipo: 'compra', valor: 300 },
    // Adicione mais dados aqui
  ]);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calcularDivida = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/calcular-divida', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ historico })
      });

      if (!response.ok) {
        throw new Error('Erro ao calcular a dívida');
      }

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      setError('Erro ao calcular a dívida. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="titulo">Histórico de Compras</h1>

        {/* Tabela de histórico de compras */}
        <table className="tabela-historico">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((transacao, index) => (
              <tr key={index}>
                <td>{transacao.data}</td>
                <td>{transacao.tipo}</td>
                <td>{transacao.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botão para calcular dívida seguindo padrões de design */}
        <button onClick={calcularDivida} disabled={loading} className="botao-calculo">
          {loading ? 'Calculando...' : 'Calcular Endividamento'}
        </button>

        {/* Exibir resultado */}
        {resultado && (
          <p className="resultado">
            Mês de maior dívida: {resultado.mesMaxDivida} com valor de R$ {resultado.maxDivida.toFixed(2)}
          </p>
        )}

        {/* Exibir erro se ocorrer */}
        {error && <p className="erro">{error}</p>}
      </header>
    </div>
  );
};

export default App;
