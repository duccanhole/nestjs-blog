import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './module/post-module/post.module';
import { PostSavedModule } from './module/post-saved/post-saved.module';
import { UserModule } from './module/user-module/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://duccanhole:123duc123@cluster0.kfwqu3z.mongodb.net/db',
      {
        connectionName: 'db',
      }
    ),
    PostModule,
    UserModule,
    PostSavedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
