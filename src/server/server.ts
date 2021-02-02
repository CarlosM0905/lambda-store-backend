import express = require('express');
import cors = require('cors');
import path = require('path');

export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number){
        this.port = port;
        this.app = express();
        this.app.use(cors({origin: "*"}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
    }

    static init(port: number){
        return new Server(port);
    }

    private publicFolder(){
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    start(callback: VoidFunction){
        this.app.listen( process.env.PORT || this.port, callback)
        this.publicFolder();
    }
}