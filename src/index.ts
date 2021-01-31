import Server from "./server/server";
import router from "./router/router";
import LambdaBD from "./sql/lambda_bd";
import ProductsBD from "./sql/products_bd";
import TarjetaBD from './sql/cards_bd';

const server = Server.init(3000);
server.app.use(router)

ProductsBD.instance;
LambdaBD.instance;
TarjetaBD.instance;

server.start(()=>{
    console.log('Servidor corriendo en el puerto 3000')
})