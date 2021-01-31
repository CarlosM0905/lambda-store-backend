import mysql = require('mysql');

let config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'LambdaStore'
}

export default class LambdaBD {
    private static _instance: LambdaBD;

    conexion: mysql.Connection;
    conectado: boolean = false;

    constructor(){
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
            console.log('BD de LambdaStore en linea')
        })
    }

    

}