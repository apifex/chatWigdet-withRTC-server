import express from 'express'
import {NextFunction, Request, Response} from 'express';

const widgetRouter = express.Router()

//TODO :
widgetRouter.get('/gettelegramusername', (req: Request, res: Response, next: NextFunction) => {
    res.send('telegram username')
})

widgetRouter.get('/getwhatssappusername', (req: Request, res: Response, next: NextFunction) => {
    res.send('whatsapp username')
})

export default widgetRouter;