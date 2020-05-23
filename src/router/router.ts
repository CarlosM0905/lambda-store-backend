import {Router, Request, Response} from 'express';
import MySQL from '../sql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response)=>{
    const query = `
        SELECT * 
        FROM heroes;
    `
    MySQL.ejecutarQuery(query, (err: any, heroes: Object[])=>{
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

    const escapedId = MySQL.instance.conexion.escape(id);

    const query = `
        SELECT * 
        FROM heroes
        WHERE id = ${escapedId};
    `

    MySQL.ejecutarQuery(query, (err: any, heroe: Object[])=>{
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