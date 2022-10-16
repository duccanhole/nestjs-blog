import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenMiddleware } from './middleware/auth.middleware';
import { PostsModule } from './module/post-module/post.module';
import { UserModule } from './module/user-module/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://duccanhole:123duc123@cluster0.kfwqu3z.mongodb.net/db',
      {
        connectionName: 'posts'
      }
    ),
    MongooseModule.forRoot(
      'mongodb+srv://duccanhole:123duc123@cluster0.kfwqu3z.mongodb.net/db',
      {
        connectionName: 'users'
      }
    ),
    PostsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenMiddleware).forRoutes('post/create');
  }
}
