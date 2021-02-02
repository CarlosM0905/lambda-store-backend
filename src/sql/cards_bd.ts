import mysql = require('mysql');

let config = {
    host: 'bysquumlkb9nclakac8f-mysql.services.clever-cloud.com',
    user: 'uzl5rr47pgapanko',
    password: 'njyYXrGwgb8OKT1j75y5',
    database: 'bysquumlkb9nclakac8f'
}

export default class CardsBD {
    private static _instance: CardsBD;

    conexion: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        console.log('Clase inicializada');

        this.conexion = mysql.createConnection(config)
        this.conectarDB();
    }

    public static get instance(){
        return this._instance || (this._instance = new this()) ;
    }


    static ejecutarQuery(query: string, callback: Function){
        this.instance.conexion.query(query, (err: Error, results: Object[], fields )=>{
            if(err){
                console.log('Error en la query')
                console.log(err);
                return callback(err);
            }

            if(results.length === 0){
                callback('El registro no existe')
            }
            else{
                callback(null, results);          
            }

        });
    }


    private conectarDB(){
        this.conexion.connect((err:mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
            }

            this.conectado = true;
            console.log('BD de tarjetas en linea')
        })
    }

    

}