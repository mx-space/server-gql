/*
 * @Author: Innei
 * @Date: 2020-08-24 21:35:20
 * @LastEditTime: 2020-10-03 10:30:32
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/common/global/tools/tools.service.ts
 * @Coding with Love
 */
import Category, { CategoryType } from '@libs/db/models/category.model'
import Note from '@libs/db/models/note.model'
import Page from '@libs/db/models/page.model'
import Post from '@libs/db/models/post.model'
import { Injectable } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { ConfigsService } from 'src/common/global/configs/configs.service'

@Injectable()
export class ToolsService {
  constructor(
    @InjectModel(Post) private readonly postModel: ReturnModelType<typeof Post>,
    @InjectModel(Note) private readonly noteModel: ReturnModelType<typeof Note>,
    @InjectModel(Page) private readonly pageModel: ReturnModelType<typeof Page>,
    @InjectModel(Category)
    public readonly categoryModel: ReturnModelType<typeof Category>,

    private readonly configs: ConfigsService,
  ) {}

  async getSiteMapContent() {
    const baseURL = this.configs.get('url').webUrl
    const posts = (await this.postModel.find().populate('category')).map(
      doc => {
        return {
          url: new URL(
            `/posts/${(doc.category as Category).slug}/${doc.slug}`,
            baseURL,
          ),
          published_at: doc.modified,
        }
      },
    )
    const notes = (await this.noteModel.find().lean()).map(doc => {
      return {
        url: new URL(`/notes/${doc.nid}`, baseURL),
        published_at: doc.modified,
      }
    })

    const pages = (await this.pageModel.find().lean()).map(doc => {
      return {
        url: new URL(`/${doc.slug}`, baseURL),
        published_at: doc.modified,
      }
    })

    return [...pages, ...notes, ...posts].sort(
      (a, b) => -(a.published_at.getTime() - b.published_at.getTime()),
    )
  }

  async getLastestNote() {
    return await this.noteModel
      .findOne()
      .sort({ nid: -1 })
      .lean()
  }

  async getCounts() {
    const posts = await this.postModel.countDocuments()
    const notes = await this.noteModel.countDocuments()

    return { posts, notes }
  }
}
