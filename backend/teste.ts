const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Maria.json');

try {
    const contratos = JSON.parse(fs.readFileSync(filePath, 'utf8')).contratos;

    if (!Array.isArray(contratos)) {
        throw new Error("Formato de entrada inválido: 'contratos' não é um array.");
    }

    const debtsByMonth = contratos.reduce((acc, contrato) => {
        contrato.parcelas.forEach(parcela => {
            const month = parcela.datavencimento.slice(0, 7); // Formato YYYY-MM
            acc[month] = (acc[month] || 0) + parcela.capitalaberto; // Acumula a dívida
        });
        return acc;
    }, {});

    const monthOfMaxDebt = Object.keys(debtsByMonth).reduce((maxMonth, month) => 
        debtsByMonth[month] > debtsByMonth[maxMonth] ? month : maxMonth, 
        Object.keys(debtsByMonth)[0]
    );

    const maxDebt = debtsByMonth[monthOfMaxDebt];

    console.log({ month: monthOfMaxDebt, maxDebt });
} catch (error) {
    console.error("Erro ao ler o arquivo ou processar os dados:", error);
}
