import request from 'supertest';
import app from '../app';

describe('Calculate Simple Debt', () => {
  it('should return the maximum debt from the history', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .set('Authorization', 'Bearer validtoken')
      .send({ contratos: [/* Dados de exemplo */] });

    expect(response.status).toBe(200);
    expect(response.body.maxDebt).toBeGreaterThan(0);
    expect(response.body.maxMonth).toMatch(/\d{2}\/\d{4}/);
  });

  it('should return 401 for missing token', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ contratos: [/* Dados de exemplo */] });

    expect(response.status).toBe(401);
  });

  it('should return 400 for invalid payload', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .set('Authorization', 'Bearer validtoken')
      .send({ contratos: [{ parcelas: [{}] }] });

    expect(response.status).toBe(400);
  });
});
