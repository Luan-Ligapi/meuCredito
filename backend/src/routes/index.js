"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const debtRoutes_1 = __importDefault(require("./debtRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware para parsear JSON
app.use('/api/auth', authRoutes_1.default); // Rotas de autenticação
app.use('/api/debt', debtRoutes_1.default); // Rotas de dívidas, protegidas por autenticação
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
