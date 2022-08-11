import { Request, Response, NextFunction } from "express";

export function requestLog(req: Request, res: Response, next: NextFunction){
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
};