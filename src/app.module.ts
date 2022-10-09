import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { UserController } from './controller/user.controller';
import { AuthenMiddleware } from './middleware/auth.middleware';
import { PostService } from './service/post.service';

@Module({
  imports: [],
  controllers: [UserController, PostController],
  providers: [PostService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenMiddleware).forRoutes('post/create')
  }
}
