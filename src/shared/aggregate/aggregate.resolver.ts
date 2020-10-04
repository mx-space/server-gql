/*
 * @Author: Innei
 * @Date: 2020-10-03 10:14:47
 * @LastEditTime: 2020-10-04 09:20:35
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/shared/aggregate/aggregate.resolver.ts
 * @Mark: Coding with Love
 */
import Category from '@libs/db/models/category.model'
import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { pick } from 'lodash'
import { ConfigsService } from 'src/common/global'
import { Master } from 'src/core/decorators/guest.decorator'
import {
  AggregateQueryModel,
  TimelineModel,
} from 'src/graphql/models/aggregate.model'
import { yearCondition } from 'src/utils'
import { TimelineArgsDto } from './aggregate.input'
import { AggregateService } from './aggregate.service'

@Resolver()
export class AggregateResolver {
  constructor(
    private readonly service: AggregateService,
    private readonly configs: ConfigsService,
  ) {}

  @Query(() => AggregateQueryModel)
  async aggregate(
    @Master() isMaster: boolean,
    @Args({ name: 'size', type: () => Int, defaultValue: 6 }) size?: number,
  ) {
    return {
      user: await this.configs.getMaster(),
      lastestNote: await this.service.getLastestNote(),
      pages: await this.service.pageModel
        .find()
        .sort({ order: -1 })
        .lean(),
      top: await this.service.topActivity(size, isMaster),
    }
  }

  @Query(() => TimelineModel)
  async getTimeline(@Args() args: TimelineArgsDto) {
    const { sort = 1, year } = args
    const data = {} as any

    const getPosts = async () => {
      const data = await this.service.postModel
        .find({ hide: false, ...yearCondition(year) })
        .sort({ created: sort })
        .populate('category')
        .lean()

      return data.map(item => ({
        ...pick(item, ['_id', 'title', 'slug', 'created']),
        category: item.category,
        summary:
          item.summary ??
          (item.text.length > 150
            ? item.text.slice(0, 150) + '...'
            : item.text),
        url: encodeURI(
          '/posts/' + (item.category as Category).slug + '/' + item.slug,
        ),
      }))
    }
    const getNotes = async () =>
      await this.service.noteModel
        .find({
          hide: false,
          password: undefined,
          ...yearCondition(year),
        })
        .sort({ created: sort })
        .select('_id nid title weather mood created')
        .lean()

    data.notes = await getNotes()
    data.posts = await getPosts()

    return { ...data }
  }
}
