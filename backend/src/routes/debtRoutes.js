"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Historico_1 = __importDefault(require("../models/Historico")); // Ajuste o caminho conforme necessário
const router = (0, express_1.Router)();
const SECRET_KEY = process.env.SECRET_KEY || "MeuCredito-PassH@55-sandbox"; // Use uma chave segura em produção
// Middleware para verificar o token
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extrai o token do cabeçalho
    if (!token) {
        return res.status(401).send("No token provided."); // Resposta se não houver token
    }
    // Verifique se o token é válido
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).send("Invalid token."); // Resposta se o token for inválido
        }
        next(); // Token válido, continue para a próxima função
    });
};
// Rota para calcular o valor máximo em aberto
router.post('/calculate', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const debtsByMonth = contratos.reduce((acc, contrato) => {
            contrato.parcelas.forEach((parcela) => {
                const month = parcela.datavencimento.slice(0, 7); // Formato YYYY-MM
                acc[month] = (acc[month] || 0) + parcela.capitalaberto; // Acumula a dívida
            });
            return acc;
        }, {});
        // Determina o mês com a maior dívida
        const monthOfMaxDebt = Object.keys(debtsByMonth).reduce((maxMonth, month) => debtsByMonth[month] > debtsByMonth[maxMonth] ? month : maxMonth, Object.keys(debtsByMonth)[0]);
        const maxDebt = debtsByMonth[monthOfMaxDebt];
        // Converte o mês para o formato MM/AAAA
        const formattedMonth = monthOfMaxDebt.split('-').reverse().join('/');
        res.json({ month: formattedMonth, maxDebt });
    }
    catch (error) {
        console.error("Erro ao calcular a dívida:", error);
        res.status(500).json({ message: "Erro ao calcular a dívida." });
    }
}));
// Rota para consultar o histórico
router.get('/historico', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Consultando histórico.");
        const historicos = yield Historico_1.default.find({}, { '_id': 0, 'parcelas._id': 0 }); // Exclui os '_id' dos documentos e de 'parcelas'
        if (historicos.length === 0) {
            return res.status(204).json({ message: "Nenhum histórico encontrado." });
        }
        res.json(historicos);
    }
    catch (error) {
        console.error("Erro ao consultar histórico:", error);
        return res.status(500).json({ message: "Erro ao buscar dados históricos." });
    }
}));
exports.default = router;
