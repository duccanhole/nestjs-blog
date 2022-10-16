import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/module/post-module/post.schema';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }], 'posts'),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
