"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const lambda_bd_1 = __importDefault(require("./sql/lambda_bd"));
const products_bd_1 = __importDefault(require("./sql/products_bd"));
const server = server_1.default.init(3000);
server.app.use(router_1.default);
products_bd_1.default.instance;
lambda_bd_1.default.instance;
server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
});
