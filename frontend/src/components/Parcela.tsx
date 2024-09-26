import React from 'react';

// Defina a interface Parcela
export interface Parcela {
  valorvencimento: number;
  datavencimento: string;
  dataultimopagamento: string;
  totalpago: number;
  capitalaberto: number;
}

const Parcela: React.FC<{ parcela: Parcela }> = ({ parcela }) => {
  return (
    <tr>
      <td>{parcela.datavencimento}</td>
      <td>{parcela.valorvencimento.toFixed(2)}</td>
      <td>{parcela.dataultimopagamento}</td>
      <td>{parcela.totalpago.toFixed(2)}</td>
      <td>{parcela.capitalaberto.toFixed(2)}</td>
    </tr>
  );
};

export default Parcela;
