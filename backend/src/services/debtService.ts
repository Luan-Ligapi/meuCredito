export const getMaxDebt = (contratos: any[]): { maxDebt: number, maxMonth: string } => {
    let maxDebt = 0;
    let maxMonth = '';
  
    contratos.forEach((contrato: any) => {
      contrato.parcelas.forEach((parcela: any) => {
        if (parcela.capitalaberto > maxDebt) {
          maxDebt = parcela.capitalaberto;
          maxMonth = parcela.datavencimento.split('-').slice(0, 2).join('/');
        }
      });
    });
  
    return { maxDebt, maxMonth };
  };
  