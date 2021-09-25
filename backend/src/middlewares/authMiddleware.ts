import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface TokenPayLoad {
    id: string,
    iat: number,
    exp: number
}

export default function authMiddleware(
    request: Request, response: Response, Next: NextFunction
) {
    const { authorization } = request.headers;

    if(!authorization) return response.sendStatus(401);

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, 'secret');
        const { id } = data as TokenPayLoad;
        request.userId = id;
    } catch {
        return response.sendStatus(401);
    }

    Next();
}