"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
let config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'LambdaStore'
};
class LambdaBD {
    constructor() {
        this.conectado = false;
        this.conexion = mysql.createConnection(config);
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.conexion.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en la query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.conexion.connect((err) => {
            if (err) {
                console.log(err.message);
            }
            this.conectado = true;
            console.log('BD de LambdaStore en linea');
        });
    }
}
exports.default = LambdaBD;
