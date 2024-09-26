import mongoose, { Schema, Document } from 'mongoose';

// Definindo a interface para o modelo
interface IParcela {
    valorvencimento: number;
    datavencimento: string;
    dataultimopagamento: string;
    totalpago: number;
    capitalaberto: number;
}

interface IHistorico extends Document {
    parcelas: IParcela[];
    contrato: string;
    data: string;
    valortotal: number;
    valorentrada: number;
    valorfinanciado: number;
}

// Definindo o schema para parcelas
const ParcelaSchema: Schema = new Schema({
    valorvencimento: { type: Number, required: true },
    datavencimento: { type: String, required: true },
    dataultimopagamento: { type: String, required: true },
    totalpago: { type: Number, required: true },
    capitalaberto: { type: Number, required: true }
});

// Definindo o schema principal para histórico
const HistoricoSchema: Schema = new Schema({
    parcelas: { type: [ParcelaSchema], required: true }, // Array de parcelas
    contrato: { type: String, required: true }, // Contrato
    data: { type: String, required: true }, // Data
    valortotal: { type: Number, required: true }, // Valor total
    valorentrada: { type: Number, required: true }, // Valor de entrada
    valorfinanciado: { type: Number, required: true } // Valor financiado
}, { timestamps: true }); // Adiciona campos de createdAt e updatedAt

// Criando o modelo
const HistoricoModel = mongoose.model<IHistorico>('Historico', HistoricoSchema);

export default HistoricoModel;
