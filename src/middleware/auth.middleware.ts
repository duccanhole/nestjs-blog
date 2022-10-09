import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    if(!req.headers?.token){
        throw new HttpException('Failed to authen', HttpStatus.UNAUTHORIZED);
    }
    else next();
  }
}
