"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDebtPayload = void 0;
const validateDebtPayload = (req, res, next) => {
    const { contratos } = req.body;
    if (!Array.isArray(contratos)) {
        res.status(400).json({ message: "Formato inválido, 'contratos' deve ser uma lista." });
        return;
    }
    for (const contrato of contratos) {
        if (!Array.isArray(contrato.parcelas)) {
            res.status(400).json({ message: "Cada contrato deve conter uma lista de 'parcelas'." });
            return;
        }
        for (const parcela of contrato.parcelas) {
            if (typeof parcela.valorvencimento !== 'number' || parcela.valorvencimento <= 0) {
                res.status(400).json({ message: "O valor de 'valorvencimento' deve ser um número maior que zero." });
                return;
            }
            if (typeof parcela.totalpago !== 'number') {
                res.status(400).json({ message: "O valor de 'totalpago' deve ser numérico." });
                return;
            }
            if (typeof parcela.capitalaberto !== 'number') {
                res.status(400).json({ message: "'capitalaberto' deve ser numérico." });
                return;
            }
            if (!/^\d{4}-\d{2}-\d{2}$/.test(parcela.datavencimento)) {
                res.status(400).json({ message: "'datavencimento' deve estar no formato AAAA-MM-DD." });
                return;
            }
        }
    }
    next();
};
exports.validateDebtPayload = validateDebtPayload;
