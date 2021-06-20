import {NextFunction, Request, Response} from 'express';
interface IUserError extends Error {
    code: number
}

export const userErrorsHandler = (err: IUserError, req: Request, res: Response, next: NextFunction) => {
    
    return res.status(err.code?err.code:400).send({error: err.message})
}

