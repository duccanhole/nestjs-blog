import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from '../post-module/post.module';
import { Post, PostSchema } from '../post-module/post.schema';
import { UserModule } from '../user-module/user.module';
import { User, UserSchema } from '../user-module/user.schema';
import { PostSavedController } from './post-saved.controller';
import { PostSaved, PostSavedSchema } from './post-saved.schema';
import { PostSavedService } from './post-saved.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: PostSaved.name, schema: PostSavedSchema },
        { name: Post.name, schema: PostSchema },
        { name: User.name, schema: UserSchema },
      ],
      'db',
    ),
    PostModule,
    UserModule,
  ],
  controllers: [PostSavedController],
  providers: [PostSavedService]
})
export class PostSavedModule {}
