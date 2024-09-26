import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HistoricoModel from '../models/historico'; // Ajuste o caminho conforme necessário

const router = Router();
const SECRET_KEY = process.env.SECRET_KEY || "MeuCredito-PassH@55-sandbox"; // Use uma chave segura em produção

// Middleware para verificar o token
const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho
    if (!token) {
        return res.status(401).send("No token provided."); // Resposta se não houver token
    }

    // Verifique se o token é válido
    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).send("Invalid token."); // Resposta se o token for inválido
        }
        next(); // Token válido, continue para a próxima função
    });
};

// Rota para buscar dados de dívida
router.get('/debt', verifyToken, async (req: Request, res: Response): Promise<void> => {
    try {
        res.json({ debt: "Debt data fetched successfully." });
    } catch (error) {
        res.status(500).send("Server error.");
    }
});

// Rota para calcular o valor máximo em aberto
// Rota para calcular o valor máximo em aberto
router.post('/calculate-debt', verifyToken, async (req: Request, res: Response): Promise<void> => {
    console.log("Recebendo dados para calcular dívida:", req.body); // Log do corpo da requisição
    
    const { contratos } = req.body; // Espera um array de contratos
    
    // Verifica se contratos estão presentes
    if (!contratos || !Array.isArray(contratos)) {
        console.log("Formato de entrada inválido: contratos ausentes ou não é um array.");
        res.status(400).json({ message: "Formato de entrada inválido." });
    }

    console.log("Calculando dívida com os contratos:", contratos);
    
    try {
        let maxDebt = 0;
        let monthOfMaxDebt = '';

        // Iterar sobre cada contrato
        contratos.forEach((contrato: { parcelas: Array<{ valorvencimento: number, datavencimento: string, capitalaberto: number }> }) => {
            let totalDebt = 0; // Acumular a dívida ao longo dos meses

            contrato.parcelas.forEach((parcela) => {
                const totalInOpen = parcela.valorvencimento; // Considera o valor de vencimento como dívida em aberto
                const month = parcela.datavencimento.split('-')[1] + '/' + parcela.datavencimento.split('-')[0]; // Mês/Ano no formato MM/AAAA

                totalDebt += totalInOpen; // Acumula a dívida

                // Se o total em aberto for maior que o máximo, atualiza o valor e o mês
                if (totalDebt > maxDebt) {
                    maxDebt = totalDebt;
                    monthOfMaxDebt = month;
                }
            });
        });

        res.json({ month: monthOfMaxDebt, maxDebt });
    } catch (error) {
        console.error("Erro ao calcular a dívida:", error);
        res.status(500).send("Error calculating debt.");
    }
});

// Rota para listar contratos do cliente
router.get('/contracts', verifyToken, async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Listando contratos do cliente.");

        const contracts = [
            { id: 1, client: 'Maria', amount: 500 },
            { id: 2, client: 'Maria', amount: 300 },
        ];
        res.json(contracts);
    } catch (error) {
        console.error("Erro ao listar contratos:", error);
        res.status(500).send("Server error.");
    }
});

// Rota para consultar o histórico
// Rota para consultar o histórico
router.get('/historico', verifyToken, async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("Consultando histórico.");

        const historicos = await HistoricoModel.find(); // Busca todos os documentos da coleção
        if (historicos.length === 0) {
            return res.status(404).json({ message: "Nenhum histórico encontrado." });
        }

        res.json(historicos);
    } catch (error) {
        console.error("Erro ao consultar histórico:", error);
        res.status(500).send("Error fetching historical data.");
    }
});


export default router;
