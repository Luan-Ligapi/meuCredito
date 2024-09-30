import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';

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

type SortKey = 'contrato' | 'total' | 'totalPago' | 'media' | 'totalDivida';

const Tabela: React.FC<{ contratos: ContratoData[] }> = ({ contratos }) => {
  const [openContracts, setOpenContracts] = useState<{ [key: string]: boolean }>({});
  const [sortConfig, setSortConfig] = useState<{ key: SortKey | null, direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');

  const toggleContract = (contrato: string) => {
    setOpenContracts(prev => ({ ...prev, [contrato]: !prev[contrato] }));
  };

  // Declare getSortValue before using it
  const getSortValue = (contrato: ContratoData, key: SortKey) => {
    switch (key) {
      case 'total':
        return contrato.parcelas.reduce((sum, parcela) => sum + parcela.valorvencimento, 0);
      case 'totalPago':
        return contrato.parcelas.reduce((sum, parcela) => sum + parcela.totalpago, 0);
      case 'media':
        return contrato.parcelas.length > 0 ? (contrato.parcelas.reduce((sum, parcela) => sum + parcela.valorvencimento, 0) / contrato.parcelas.length) : 0;
      case 'totalDivida':
        return contrato.parcelas.reduce((sum, parcela) => sum + parcela.capitalaberto, 0);
      default:
        return 0;
    }
  };

  const sortedContratos = [...contratos].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    const aValue = getSortValue(a, sortConfig.key);
    const bValue = getSortValue(b, sortConfig.key);

    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  const filteredContratos = sortedContratos.filter(contrato =>
    contrato.contrato.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <h1>Histórico de Compras</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Buscar contrato..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '5px', flex: 1 }}
        />
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
      </div>
      <table className="tabela-historico">
        <thead>
          <tr>
            <th>Contrato</th>
            <th onClick={() => requestSort('total')}>Total (R$) <FontAwesomeIcon icon={sortConfig.key === 'total' ? (sortConfig.direction === 'ascending' ? faChevronUp : faChevronDown) : faChevronDown} /></th>
            <th onClick={() => requestSort('totalPago')}>Total Pago (R$) <FontAwesomeIcon icon={sortConfig.key === 'totalPago' ? (sortConfig.direction === 'ascending' ? faChevronUp : faChevronDown) : faChevronDown} /></th>
            <th onClick={() => requestSort('media')}>Média de Parcelas (R$) <FontAwesomeIcon icon={sortConfig.key === 'media' ? (sortConfig.direction === 'ascending' ? faChevronUp : faChevronDown) : faChevronDown} /></th>
            <th onClick={() => requestSort('totalDivida')}>Total Endividamento (R$) <FontAwesomeIcon icon={sortConfig.key === 'totalDivida' ? (sortConfig.direction === 'ascending' ? faChevronUp : faChevronDown) : faChevronDown} /></th>
            <th>Parcelas</th>
          </tr>
        </thead>
        <tbody>
          {filteredContratos.map((contrato, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleContract(contrato.contrato)} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 'bold' }}>{contrato.contrato}</td>
                <td>{getSortValue(contrato, 'total').toFixed(2)}</td>
                <td>{getSortValue(contrato, 'totalPago').toFixed(2)}</td>
                <td>{(getSortValue(contrato, 'media')).toFixed(2)}</td>
                <td>{getSortValue(contrato, 'totalDivida').toFixed(2)}</td>
                <td>
                  <FontAwesomeIcon icon={openContracts[contrato.contrato] ? faChevronUp : faChevronDown} />
                </td>
              </tr>
              {openContracts[contrato.contrato] && contrato.parcelas.map((parcela, idx) => (
                <tr key={idx}>
                  <td colSpan={6}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabela;
