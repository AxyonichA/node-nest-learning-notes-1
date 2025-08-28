import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module'
import { PostsModule } from 'src/posts/posts.module'
import { PostsController } from 'src/posts/posts.controller'
import { PostsService } from 'src/posts/providers/posts.service'

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
