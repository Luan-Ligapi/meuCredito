import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HistoricoModel from '../models/Historico'; // Ajuste o caminho conforme necessário

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

// Rota para calcular o valor máximo em aberto
router.post('/calculate', verifyToken, async (req: Request, res: Response): Promise<void> => {
    console.log("Recebendo dados para calcular dívida:", req.body); // Log do corpo da requisição

    const { contratos } = req.body; // Espera um array de contratos

    // Verifica se contratos estão presentes
    if (!contratos || !Array.isArray(contratos) || contratos.length === 0) {
        console.log("Formato de entrada inválido: contratos ausentes ou não é um array.");
        res.status(400).json({ message: "Formato de entrada inválido." });
        return;
    }

    console.log("Calculando dívida com os contratos:", contratos);
    
    try {
        // Usando reduce para acumular a dívida por mês
        const debtsByMonth = contratos.reduce((acc, contrato: { parcelas: Array<{ capitalaberto: number; datavencimento: string }> }) => {
            contrato.parcelas.forEach((parcela: { capitalaberto: number; datavencimento: string }) => {
                const month = parcela.datavencimento.slice(0, 7); // Formato YYYY-MM
                acc[month] = (acc[month] || 0) + parcela.capitalaberto; // Acumula a dívida
            });
            return acc;
        }, {});

        // Determina o mês com a maior dívida
        const monthOfMaxDebt = Object.keys(debtsByMonth).reduce((maxMonth, month) => 
            debtsByMonth[month] > debtsByMonth[maxMonth] ? month : maxMonth, 
            Object.keys(debtsByMonth)[0]
        );

        const maxDebt = debtsByMonth[monthOfMaxDebt];

        // Converte o mês para o formato MM/AAAA
        const formattedMonth = monthOfMaxDebt.split('-').reverse().join('/');

        res.json({ month: formattedMonth, maxDebt });
    } catch (error) {
        console.error("Erro ao calcular a dívida:", error);
        res.status(500).json({ message: "Erro ao calcular a dívida." });
    }
});





// Rota para consultar o histórico
router.get('/historico', verifyToken, async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("Consultando histórico.");

        const historicos = await HistoricoModel.find({}, { '_id': 0, 'parcelas._id': 0 }); // Exclui os '_id' dos documentos e de 'parcelas'

        if (historicos.length === 0) {
            return res.status(204).json({ message: "Nenhum histórico encontrado." });
        }

        res.json(historicos);
    } catch (error) {
        console.error("Erro ao consultar histórico:", error);
        return res.status(500).json({ message: "Erro ao buscar dados históricos." });
    }
});

export default router;
