/*
 * @Author: Innei
 * @Date: 2020-04-29 12:36:28
 * @LastEditTime: 2020-10-01 13:35:57
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/libs/db/src/models/link.model.ts
 * @Coding with Love
 */

import { BaseModel } from './base.model'
import { prop } from '@typegoose/typegoose'
import { IsUrl, IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator'

import { range } from 'lodash'

export enum LinkType {
  Friend,
  Collection,
}

export enum LinkState {
  Pass,
  Audit,
}
export class Link extends BaseModel {
  @prop({ required: true, trim: true, unique: true })
  @IsString()
  name: string

  @prop({ required: true, trim: true, unique: true })
  @IsUrl({ require_protocol: true })
  url: string

  @IsOptional()
  @IsUrl({ require_protocol: true })
  @prop({ trim: true })
  avatar?: string

  @IsOptional()
  @IsString()
  @prop({ trim: true })
  description?: string

  @IsOptional()
  @IsEnum(LinkType)
  @prop({ default: LinkType.Friend })
  type?: LinkType

  @IsOptional()
  @IsBoolean()
  @prop({ default: LinkState.Pass })
  state: LinkState

  get hide() {
    return this.state === LinkState.Audit
  }
}
