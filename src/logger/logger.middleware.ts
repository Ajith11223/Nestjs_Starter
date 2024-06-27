import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.body)
    // if(req.body.name){

    //   next();
    // }else{
    //   throw new NotFoundException("no body")
    // }
    next();
  }
}
