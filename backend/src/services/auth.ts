import { Request, Response, NextFunction } from 'express';

export const authorization = (request: Request, response: Response, next: NextFunction) => {

    //TODO check authorization
    console.log("TODO check authorization /src/services/auth.ts");

    return next();
}