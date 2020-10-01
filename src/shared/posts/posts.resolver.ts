/*
 * @Author: Innei
 * @Date: 2020-10-01 13:47:59
 * @LastEditTime: 2020-10-01 15:33:16
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/shared/posts/posts.resolver.ts
 * @Mark: Coding with Love
 */
import { Args, ID, Query, Resolver } from '@nestjs/graphql'
import { PostItemModel } from '../../models/post.model'
import { PostsService } from './posts.service'

@Resolver()
export class PostsResolver {
  constructor(private postService: PostsService) {}
  @Query(() => PostItemModel)
  public async getPostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.postService.findById(id).populate('category')
  }
}
