// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    // Aqui você adicionaria a lógica para validar o token
    if (token === "Bearer validtoken") {
        next();
    } else {
        res.status(401).json({ message: "Invalid token" });
    }
};
