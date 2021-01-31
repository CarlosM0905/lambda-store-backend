import { PaymentProxy } from './../classes/paymentProxy.class';
import {Router, Request, Response} from 'express';
import ProductsBD from '../sql/products_bd';
import LambdaBD from '../sql/lambda_bd';
import CardsBD from '../sql/cards_bd';

const router = Router();


router.post('/login', (req: Request, res: Response) => {
    const user = req.body.user;
    const password = req.body.password;

    const query = `
            SELECT * 
            FROM usuario
            WHERE user="${user}" AND password="${password}";
        `;
    LambdaBD.ejecutarQuery(query, (err: any, results: Object[]) => {
        if(err){
            return res.status(500).json(
            {
                ok: false,
                error: err,
            })
        }
        else if(err === 'El registro no existe'){
            return res.status(404).json(
                {
                    ok: false,
                    message: 'El usuario no existe. Registrese',
                })
        }
        else{
            return res.status(200).json({
                ok: true,
                isUser: true,
            })
        }
    })
})

router.get('/products', (req: Request, res: Response) => {
    const query = `
        SELECT * 
        FROM producto;
    `;

    ProductsBD.ejecutarQuery(query, (err: any, results: Object[]) => {
        if(err){
            return res.status(500).json(
                {
                    ok: false,
                    error: err,
                })
        }
        else if(err === 'El registro no existe'){
            return res.status(404).json(
                {
                    ok: false,
                    message: 'No existen productos registrados',
                })
        }
        else{
            return res.status(200).json({
                ok: true,
                products: results,
            })
        }
        
    });
})

router.post('/verify-card', (req: Request, res: Response) => {
    const {cardNumber, amountCart, monthCard, yearCard, codeCard} = req.body;
    
    const query = `
        SELECT * 
        FROM tarjeta
        WHERE numeroTarjeta = ${cardNumber};
    `;

    CardsBD.ejecutarQuery(query, (err: any, results: Object[]) => {
        if(err){
            return res.status(500).json(
                {
                    ok: false,
                    error: err,
                })
        }
        else if(err === 'El registro no existe'){
            return res.status(404).json(
                {
                    ok: false,
                    message: 'No existen productos registrados',
                })
        }
        else{
            const resultCard = JSON.parse(JSON.stringify(results[0]));
            const pymntProxy = new PaymentProxy(resultCard.saldo, resultCard.expMonth, resultCard.expYear, resultCard.codigo);

            if(pymntProxy.checkPayment(amountCart, monthCard, yearCard, codeCard)){
                const query = `
                UPDATE tarjeta 
                SET saldo = ${resultCard.saldo - amountCart}
                WHERE numeroTarjeta = ${cardNumber};
            `;
                
                CardsBD.ejecutarQuery(query, (err: any, results: Object[]) => {
                    if(err){
                        return res.status(500).json(
                            {
                                ok: false,
                                error: err,
                            })
                    }
                    else if(err === 'El registro no existe'){
                        return res.status(404).json(
                            {
                                ok: false,
                                message: 'No existen productos registrados',
                            })
                    }
                });

              return res.status(200).json({
                 ok: true,
                 message: 'La compra se realizo correctamente',
             });
            }
            else{
                return res.status(406).json({
                    ok: true,
                    message: 'Su tarjeta no cumple con los requisitos para procesar el pago',
                });
            }            
        }
    })
});

export default router;