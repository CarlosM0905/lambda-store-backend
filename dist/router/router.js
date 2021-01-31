"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_bd_1 = __importDefault(require("../sql/products_bd"));
const lambda_bd_1 = __importDefault(require("../sql/lambda_bd"));
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
            console.log(results);
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
            console.log(results);
            return res.status(200).json({
                ok: true,
                products: results,
            });
        }
    });
});
router.get('/heroes', (req, res) => {
    const query = `
        SELECT * 
        FROM heroes;
    `;
    products_bd_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes: heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const escapedId = products_bd_1.default.instance.conexion.escape(id);
    const query = `
        SELECT * 
        FROM heroes
        WHERE id = ${escapedId};
    `;
    products_bd_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe: heroe
            });
        }
    });
});
exports.default = router;
