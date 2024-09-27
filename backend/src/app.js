"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const debtRoutes_1 = __importDefault(require("./routes/debtRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const mongoURI = 'mongodb+srv://luangatitoz:lZf9sqy2LYOXO6nq@meucredito.scjkb.mongodb.net/?retryWrites=true&w=majority&appName=meuCredito'; // Substitua <db_password> pela sua senha
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('MongoDB conectado com sucesso');
})
    .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});
const cors = require('cors');
app.use(cors()); // Isso permite solicitações de qualquer origem
// Ou você pode configurar para apenas algumas origens:
app.use(cors({
    origin: '*' // Apenas permitir solicitações desta origem
}));
app.use(express_1.default.json({ limit: '50mb' })); // Ajuste conforme necessário
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/debt', debtRoutes_1.default);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
