import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";


@Injectable()
export class AuthenMiddleware implements NestMiddleware{
    use(req: any, res: any, next: NextFunction) {
        console.log('middleware is run ...');
        next()
    }

}