import { Request, Response } from 'express';
import { getMaxDebt } from '../services/debtService';

export const calculateMaxDebt = (req: Request, res: Response) => {
  const { contratos } = req.body;

  try {
    const result = getMaxDebt(contratos);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao calcular dívida.', error: error.message });
  }
};
