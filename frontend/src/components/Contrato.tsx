import React, { useState } from 'react';
import Parcela, { Parcela as ParcelaType } from './Parcela';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Parcela {
  valorvencimento: number;
  datavencimento: string;
  dataultimopagamento: string;
  totalpago: number;
  capitalaberto: number;
}

interface Contrato {
  parcelas: ParcelaType[];
  contrato: string;
  data: string;
  valortotal: number;
  valorentrada: number;
  valorfinanciado: number;
}

interface ContratoProps {
  contrato: Contrato; // Um único contrato
}

const Contrato: React.FC<ContratoProps> = ({ contrato }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <tr onClick={toggleDetails} style={{ cursor: 'pointer' }}>
        <td>{contrato.data}</td>
        <td>{contrato.valortotal.toFixed(2)}</td>
        <td>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={3}>
            <table className="tabela-parcelas">
              <thead>
                <tr>
                  <th>Data de Vencimento</th>
                  <th>Valor Vencimento (R$)</th>
                  <th>Data Último Pagamento</th>
                  <th>Total Pago (R$)</th>
                  <th>Capital Aberto (R$)</th>
                </tr>
              </thead>
              <tbody>
                {contrato.parcelas.map((parcela, idx) => (
                  <Parcela key={idx} parcela={parcela} />
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default Contrato;
