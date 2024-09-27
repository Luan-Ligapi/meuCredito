"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// authRoutes.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    // Simulação de autenticação
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.json({ message: 'Login successful', token: 'fake-jwt-token' });
    }
    else {
        res.status(401).json({ message: 'Login failed' });
    }
});
exports.default = router;
