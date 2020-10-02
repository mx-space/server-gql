/*
 * @Author: Innei
 * @Date: 2020-10-02 12:05:10
 * @LastEditTime: 2020-10-02 14:23:08
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/shared/categories/categories.resolver.ts
 * @Mark: Coding with Love
 */
import { BadRequestException } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Master } from 'src/core/decorators/guest.decorator'
import { CannotFindException } from 'src/core/exceptions/cant-find.exception'
import { IdInputArgsDtoOptional } from 'src/graphql/args/id.input'
import { CategoryItemModel } from 'src/graphql/models/category.model'
import { PostsService } from '../posts/posts.service'
import { CategoriesService } from './categories.service'
import {
  CategoryPagerModel,
  CategoryType,
  MultiCategoriesArgsDto,
  MultiQueryTagAndCategoryDto,
  SlugArgsDto,
} from './dto/category.input'

@Resolver()
export class CategoriesResolver {
  constructor(
    private readonly service: CategoriesService,
    private readonly postService: PostsService,
  ) {}

  @Query(() => CategoryPagerModel)
  async getCategories(@Args() args: MultiCategoriesArgsDto) {
    const { type = CategoryType.Category, ids, joint } = args

    if (ids) {
      // const categoryDocs = await this.categoryService.find({
      //   $and: [categories.map((id) => ({ _id: id }))],
      // })
      return joint
        ? await Promise.all(
            ids.map(async id => {
              return await this.postService.find(
                { categoryId: id },
                {
                  select: 'title slug _id categoryId created modified',
                  sort: { created: -1 },
                },
              )
            }),
          )
        : await Promise.all(
            ids.map(async id => {
              const posts = await this.postService.find(
                { categoryId: id },
                {
                  select: 'title slug _id created modified',
                  sort: { created: -1 },
                },
              )
              const category = await this.service.findById(id).lean()

              return {
                category: { ...category, children: posts },
              }
            }),
          )
    }

    return await this.service.find({ type })
  }

  @Query(() => CategoryItemModel)
  async getCategoryBySlug(
    @Args() { slug }: SlugArgsDto,
    @Args() { tag }: MultiQueryTagAndCategoryDto,
    @Args() { id }: IdInputArgsDtoOptional,
    @Master() isMaster: boolean,
  ) {
    if (tag === true) {
      return {
        tag,
        data: await this.service.findArticleWithTag(slug, isMaster),
      }
    }

    const res = id
      ? await this.service.findById(id).lean()
      : await this.service
          .findOne({
            slug,
          })
          .lean()

    if (!res) {
      throw new CannotFindException()
    }

    const children =
      (await this.service.findCategoryPost(
        res._id,
        isMaster,
        tag ? { tags: tag } : {},
      )) || []

    Reflect.set(res, 'children', children)

    return res
  }
}
