/*
 * @Author: Innei
 * @Date: 2020-10-01 13:48:50
 * @LastEditTime: 2020-10-01 13:49:13
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/shared/shared.module.ts
 * @Mark: Coding with Love
 */
import { Module } from '@nestjs/common'
import { PostsResolver } from './posts/posts.resolver'

@Module({
  imports: [PostsResolver],
})
export class SharedModule {}
