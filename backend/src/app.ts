import express from 'express';
import authRoutes from './routes/authRoutes';
import debtRoutes from './routes/debtRoutes';
import mongoose from 'mongoose';

const app = express();

const PORT = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://luangatitoz:lZf9sqy2LYOXO6nq@meucredito.scjkb.mongodb.net/?retryWrites=true&w=majority&appName=meuCredito'; // Substitua <db_password> pela sua senha
mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB conectado com sucesso');
})
.catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});


app.use(express.json({ limit: '50mb' })); // Ajuste conforme necessário
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/debt', debtRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;