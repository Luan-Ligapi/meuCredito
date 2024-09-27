"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Calculate Simple Debt', () => {
    it('should return the maximum debt from the history', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/calculate')
            .set('Authorization', 'Bearer validtoken')
            .send({ contratos: [ /* Dados de exemplo */] });
        expect(response.status).toBe(200);
        expect(response.body.maxDebt).toBeGreaterThan(0);
        expect(response.body.maxMonth).toMatch(/\d{2}\/\d{4}/);
    }));
    it('should return 401 for missing token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/calculate')
            .send({ contratos: [ /* Dados de exemplo */] });
        expect(response.status).toBe(401);
    }));
    it('should return 400 for invalid payload', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/calculate')
            .set('Authorization', 'Bearer validtoken')
            .send({ contratos: [{ parcelas: [{}] }] });
        expect(response.status).toBe(400);
    }));
});
