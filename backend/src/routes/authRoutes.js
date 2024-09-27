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
// authRoutes.ts
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User"); // Ajuste o caminho conforme necessário
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const SECRET_KEY = process.env.SECRET_KEY || "MeuCredito-PassH@55-sandbox"; // Use uma chave segura em produção
// Função para registrar um novo usuário
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validação do nome de usuário
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Apenas letras, números e underscores; 3-20 caracteres
    if (!usernameRegex.test(username)) {
        res.status(400).json({ message: "Nome de usuário deve conter apenas letras, números e underscores, e ter entre 3 e 20 caracteres." });
        return;
    }
    // Validação da senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Mínimo 8 caracteres
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial." });
        return;
    }
    try {
        // Verifica se o usuário já existe
        const existingUser = yield User_1.UserModel.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: "Usuário já existe" });
            return; // Saia da função após enviar a resposta
        }
        // Hash a senha antes de salvar no banco de dados
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Cria um novo usuário
        const newUser = new User_1.UserModel({
            username,
            password: hashedPassword
        });
        yield newUser.save();
        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao registrar o usuário:", error);
        res.status(500).json({ message: "Erro ao registrar o usuário" });
    }
});
// Função para autenticar um usuário
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Verifica se o usuário existe
        const user = yield User_1.UserModel.findOne({ username });
        if (!user) {
            res.status(401).json({ message: "Credenciais inválidas" });
            return; // Saia da função após enviar a resposta
        }
        // Verifica a senha
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Credenciais inválidas" });
            return; // Saia da função após enviar a resposta
        }
        // Gera um token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: "Login bem-sucedido!",
            token: `Bearer ${token}`
        });
    }
    catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ message: "Erro ao fazer login" });
    }
});
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
// Registrar as rotas
router.post('/register', registerUser);
router.post('/login', loginHandler);
// Adicionando a rota para obter dados protegidos como exemplo
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "Você acessou uma rota protegida!" });
});
exports.default = router;
