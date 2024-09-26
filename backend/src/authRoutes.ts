// authRoutes.ts
import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
    // Simulação de autenticação
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.json({ message: 'Login successful', token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ message: 'Login failed' });
    }
});

export default router;