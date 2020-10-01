/*
 * @Author: Innei
 * @Date: 2020-09-17 14:04:22
 * @LastEditTime: 2020-10-01 13:35:21
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/libs/db/src/models/page.model.ts
 * @Mark: Coding with Love
 */
import { prop } from '@typegoose/typegoose'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { Schema } from 'mongoose'
import { IsNilOrString } from '../../../../src/common/decorators/isNilOrString'
import { WriteBaseModel } from './base.model'

export const pageType = ['md', 'html', 'frame']

export default class Page extends WriteBaseModel {
  @prop({ trim: 1, index: true, required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  slug!: string

  @prop({ trim: true })
  @IsString()
  @IsOptional()
  @IsNilOrString()
  subtitle?: string | null

  @prop({ default: 1 })
  @IsInt()
  @Min(0)
  @IsOptional()
  order!: number

  @prop({ default: 'md' })
  @IsEnum(pageType)
  @IsOptional()
  type?: string

  @prop({ type: Schema.Types.Mixed })
  @IsOptional()
  @IsObject()
  options?: Record<string, any>
}
