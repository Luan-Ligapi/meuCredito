import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Definição das interfaces
interface Parcela {
  valorvencimento: number;
  datavencimento: string;
  dataultimopagamento: string;
  totalpago: number;
  capitalaberto: number;
}

interface ContratoData {
  parcelas: Parcela[];
  contrato: string;
  data: string;
  valortotal: number;
  valorentrada: number;
  valorfinanciado: number;
}

const Tabela: React.FC<{ contratos: ContratoData[] }> = ({ contratos }) => {
  const [openContracts, setOpenContracts] = useState<{ [key: string]: boolean }>({}); // Chave: contrato

  const toggleContract = (contrato: string) => {
    setOpenContracts(prev => ({ ...prev, [contrato]: !prev[contrato] }));
  };

  return (
    <table className="tabela-historico">
      <thead>
        <tr>
          <th>Contrato</th>
          <th>Total (R$)</th>
          <th>Média de Parcelas (R$)</th>
          <th>Parcelas</th>
        </tr>
      </thead>
      <tbody>
        {contratos.map((contrato, index) => {
          const totalParcelas = contrato.parcelas.reduce((sum, parcela) => sum + parcela.valorvencimento, 0);
          const mediaParcelas = contrato.parcelas.length > 0 ? (totalParcelas / contrato.parcelas.length) : 0;

          return (
            <React.Fragment key={index}>
              <tr onClick={() => toggleContract(contrato.contrato)} style={{ cursor: 'pointer', backgroundColor: '#f7f9fc' }}>
                <td style={{ fontWeight: 'bold', color: '#0052CC' }}>{contrato.contrato}</td>
                <td>{totalParcelas.toFixed(2)}</td>
                <td>{mediaParcelas.toFixed(2)}</td>
                <td>
                  <FontAwesomeIcon icon={openContracts[contrato.contrato] ? faChevronUp : faChevronDown} />
                </td>
              </tr>
              {openContracts[contrato.contrato] && contrato.parcelas.map((parcela, idx) => (
                <tr key={idx}>
                  <td colSpan={4}>
                    <div>
                      <strong>Data de Vencimento:</strong> {parcela.datavencimento}<br />
                      <strong>Valor Vencimento (R$):</strong> {parcela.valorvencimento.toFixed(2)}<br />
                      <strong>Data Último Pagamento:</strong> {parcela.dataultimopagamento}<br />
                      <strong>Total Pago (R$):</strong> {parcela.totalpago.toFixed(2)}<br />
                      <strong>Capital Aberto (R$):</strong> {parcela.capitalaberto.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default Tabela;
