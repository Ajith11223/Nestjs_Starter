import { Module, NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UsersController } from './users/users.controller';
@Module({
  imports: [UsersModule, ProductModule,MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(log: MiddlewareConsumer) {
    log
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'users', method: RequestMethod.POST },
      // )
      .forRoutes(UsersController); 
  }
}
