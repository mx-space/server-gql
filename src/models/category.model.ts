/*
 * @Author: Innei
 * @Date: 2020-10-01 14:46:37
 * @LastEditTime: 2020-10-01 14:47:58
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/models/category.model.ts
 * @Mark: Coding with Love
 */
import Category, { CategoryType } from '@libs/db/models/category.model'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseGLModel } from './base.model'

@ObjectType()
export class CategoryItemModel extends BaseGLModel implements Category {
  name: string
  slug: string

  @Field(() => Number)
  type: CategoryType
}
