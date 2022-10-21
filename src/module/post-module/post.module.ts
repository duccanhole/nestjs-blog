import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/module/post-module/post.schema';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { User, UserSchema } from '../user-module/user.schema';
import { UserModule } from '../user-module/user.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Post.name, schema: PostSchema },
        {
          name: User.name,
          schema: UserSchema,
        },
      ],
      'posts',
    ),
    UserModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
