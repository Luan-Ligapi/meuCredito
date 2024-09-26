import express from 'express';

const app = express();
app.use(express.json());

app.post('/calculate-simple-debt', (req, res) => {
  try {
    const { historico } = req.body;

    let maxDivida = 0;
    let mesMaxDivida = '';
    let dividaAtual = 0;

    historico.forEach((transacao: any) => {
      const { data, tipo, valor } = transacao;

      if (tipo === 'compra') {
        dividaAtual += valor;
      } else if (tipo === 'pagamento') {
        dividaAtual -= valor;
      }

      if (dividaAtual > maxDivida) {
        maxDivida = dividaAtual;
        mesMaxDivida = data;
      }
    });

    res.send({ maxDivida, mesMaxDivida });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
