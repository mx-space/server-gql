/*
 * @Author: Innei
 * @Date: 2020-10-01 13:48:50
 * @LastEditTime: 2020-10-01 15:23:19
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/shared/shared.module.ts
 * @Mark: Coding with Love
 */
import { Module } from '@nestjs/common'
import { CategoriesService } from './categories/categories.service'
import { PostsResolver } from './posts/posts.resolver'
import { PostsService } from './posts/posts.service'
import { CategoriesResolver } from './categories/categories.resolver';
import { NotesResolver } from './notes/notes.resolver';
import { NotesService } from './notes/notes.service';

@Module({
  providers: [PostsService, CategoriesService, PostsResolver, CategoriesResolver, NotesResolver, NotesService],
})
export class SharedModule {}
