"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Definindo o schema para parcelas
const ParcelaSchema = new mongoose_1.Schema({
    valorvencimento: { type: Number, required: true },
    datavencimento: { type: String, required: true },
    dataultimopagamento: { type: String, required: true },
    totalpago: { type: Number, required: true },
    capitalaberto: { type: Number, required: true }
});
// Definindo o schema principal para histórico
const HistoricoSchema = new mongoose_1.Schema({
    parcelas: { type: [ParcelaSchema], required: true }, // Array de parcelas
    contrato: { type: String, required: true }, // Contrato
    data: { type: String, required: true }, // Data
    valortotal: { type: Number, required: true }, // Valor total
    valorentrada: { type: Number, required: true }, // Valor de entrada
    valorfinanciado: { type: Number, required: true } // Valor financiado
}, { timestamps: true }); // Adiciona campos de createdAt e updatedAt
// Criando o modelo
const HistoricoModel = mongoose_1.default.model('Historico', HistoricoSchema);
exports.default = HistoricoModel;
