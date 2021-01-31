import {Router, Request, Response} from 'express';
import ProductsBD from '../sql/products_bd';
import LambdaBD from '../sql/lambda_bd';

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
            console.log(results);
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
            console.log(results);
            return res.status(200).json({
                ok: true,
                products: results,
            })
        }
        
    });
})

router.get('/heroes', (req: Request, res: Response)=>{
    const query = `
        SELECT * 
        FROM heroes;
    `
    ProductsBD.ejecutarQuery(query, (err: any, heroes: Object[])=>{
        if(err){
            res.status(400).json({
                ok:false,
                error: err
            })
        }
        else{
            res.json({
                ok: true,
                heroes: heroes
            })
        }
    })

})

router.get('/heroes/:id', (req: Request, res: Response)=>{
    
    const id = req.params.id;

    const escapedId = ProductsBD.instance.conexion.escape(id);

    const query = `
        SELECT * 
        FROM heroes
        WHERE id = ${escapedId};
    `

    ProductsBD.ejecutarQuery(query, (err: any, heroe: Object[])=>{
        if(err){
            res.status(400).json({
                ok:false,
                error: err
            })
        }
        else{
            res.json({
                ok: true,
                heroe: heroe
            })
        }
    })
})



export default router;