import {NextFunction, Request, Response} from 'express';
import Logger from './logger';
interface IUserError extends Error {
    code: number
}

export const userErrorsHandler = (err: IUserError, req: Request, res: Response, next: NextFunction) => {
    Logger.error(err.message)
    return res.status(err.code?err.code:400).send({error: err.message})
}

