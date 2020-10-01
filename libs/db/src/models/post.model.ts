/*
 * @Author: Innei
 * @Date: 2020-05-06 22:14:51
 * @LastEditTime: 2020-08-02 15:43:15
 * @LastEditors: Innei
 * @FilePath: /mx-server/libs/db/src/models/post.model.ts
 * @Coding with Love
 */

import Category from '@libs/db/models/category.model'
import { index, prop, Ref } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import { WriteBaseModel } from './base.model'
import { Count } from './note.model'

@index({ slug: 1 })
@index({ modified: -1 })
@index({ text: 'text' })
export default class Post extends WriteBaseModel {
  @prop({ trim: true, unique: true, required: true })
  slug!: string

  @prop()
  summary?: string

  @prop({ ref: () => Category, required: true })
  categoryId: Ref<Category>

  @prop({
    ref: () => Category,
    foreignField: '_id',
    localField: 'categoryId',
    justOne: true,
  })
  public category: Ref<Category>

  @prop({ default: false })
  hide?: boolean

  @prop({ default: true })
  copyright?: boolean

  @prop({
    set: (val: string[]) => {
      return val
    },
    get(val) {
      return val
    },
    type: [String],
  })
  tags?: string[]

  @prop({ type: Count, default: { read: 0, like: 0 }, _id: false })
  count?: Count

  @prop({ type: Schema.Types.Mixed })
  options?: Record<any, any>
}
