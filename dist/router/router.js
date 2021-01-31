"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paymentProxy_class_1 = require("./../classes/paymentProxy.class");
const express_1 = require("express");
const products_bd_1 = __importDefault(require("../sql/products_bd"));
const lambda_bd_1 = __importDefault(require("../sql/lambda_bd"));
const cards_bd_1 = __importDefault(require("../sql/cards_bd"));
const router = express_1.Router();
router.post('/login', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const query = `
            SELECT * 
            FROM usuario
            WHERE user="${user}" AND password="${password}";
        `;
    lambda_bd_1.default.ejecutarQuery(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err,
            });
        }
        else if (err === 'El registro no existe') {
            return res.status(404).json({
                ok: false,
                message: 'El usuario no existe. Registrese',
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                isUser: true,
            });
        }
    });
});
router.get('/products', (req, res) => {
    const query = `
        SELECT * 
        FROM producto;
    `;
    products_bd_1.default.ejecutarQuery(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err,
            });
        }
        else if (err === 'El registro no existe') {
            return res.status(404).json({
                ok: false,
                message: 'No existen productos registrados',
            });
        }
        else {
            return res.status(200).json({
                ok: true,
                products: results,
            });
        }
    });
});
router.post('/verify-card', (req, res) => {
    const { cardNumber, amountCart, monthCard, yearCard, codeCard } = req.body;
    const query = `
        SELECT * 
        FROM tarjeta
        WHERE numeroTarjeta = ${cardNumber};
    `;
    cards_bd_1.default.ejecutarQuery(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err,
            });
        }
        else if (err === 'El registro no existe') {
            return res.status(404).json({
                ok: false,
                message: 'No existen productos registrados',
            });
        }
        else {
            const resultCard = JSON.parse(JSON.stringify(results[0]));
            const pymntProxy = new paymentProxy_class_1.PaymentProxy(resultCard.saldo, resultCard.expMonth, resultCard.expYear, resultCard.codigo);
            if (pymntProxy.checkPayment(amountCart, monthCard, yearCard, codeCard)) {
                const query = `
                UPDATE tarjeta 
                SET saldo = ${resultCard.saldo - amountCart}
                WHERE numeroTarjeta = ${cardNumber};
            `;
                cards_bd_1.default.ejecutarQuery(query, (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            error: err,
                        });
                    }
                    else if (err === 'El registro no existe') {
                        return res.status(404).json({
                            ok: false,
                            message: 'No existen productos registrados',
                        });
                    }
                });
                return res.status(200).json({
                    ok: true,
                    message: 'La compra se realizo correctamente',
                });
            }
            else {
                return res.status(406).json({
                    ok: true,
                    message: 'Su tarjeta no cumple con los requisitos para procesar el pago',
                });
            }
        }
    });
});
exports.default = router;
