import { Request, Response, NextFunction } from "express";

export function requestLog(req: Request, res: Response, next: NextFunction){
    console.log('REQUEST ' + req.method + req.url);
    return next();
};