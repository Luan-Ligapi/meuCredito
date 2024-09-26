interface Parcela {
  valorvencimento: number;
  totalpago: number;
  capitalaberto: number;
  datavencimento: string;
}

interface Contrato {
  parcelas: Parcela[];
}

export const getMaxDebt = (contratos: Contrato[]): { maxDebt: number, maxMonth: string } => {
  let maxDebt = 0;
  let maxMonth = '';

  contratos.forEach((contrato: Contrato) => {
    contrato.parcelas.forEach((parcela: Parcela) => {
      if (parcela.capitalaberto > maxDebt) {
        maxDebt = parcela.capitalaberto;
        maxMonth = parcela.datavencimento.split('-').slice(0, 2).join('/');
      }
    });
  });

  return { maxDebt, maxMonth };
};
