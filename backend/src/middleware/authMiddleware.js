"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    // Aqui você adicionaria a lógica para validar o token
    if (token === "Bearer validtoken") {
        next();
    }
    else {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
