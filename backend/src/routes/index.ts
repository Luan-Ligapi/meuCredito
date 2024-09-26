import express from 'express';
import authRoutes from './authRoutes';
import debtRoutes from './debtRoutes';

const app = express();

app.use(express.json()); // Middleware para parsear JSON
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/debt', debtRoutes); // Rotas de dívidas, protegidas por autenticação

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`); 
});

export default app;
