/*
 * @Author: Innei
 * @Date: 2020-10-01 15:45:04
 * @LastEditTime: 2020-10-02 14:21:19
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/graphql/args/id.input.ts
 * @Mark: Coding with Love
 */
import {
  ArgsType,
  Field,
  ID,
  Int,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql'
import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  ValidateIf,
} from 'class-validator'
import { Transform } from 'class-transformer'

@ArgsType()
export class IdInputArgsDto {
  @IsMongoId()
  @IsNotEmpty()
  @Field(() => ID)
  id: string
}
@ArgsType()
export class IdInputArgsDtoOptional {
  @IsMongoId()
  @IsOptional()
  id?: string
}
@ArgsType()
export class PagerArgsDto {
  @IsInt()
  @Min(1)
  @Max(20)
  @IsOptional()
  @Field(() => Int)
  size?: number

  @IsInt()
  @Min(1)
  @IsOptional()
  @Field(() => Int)
  page?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int)
  state?: number

  @IsOptional()
  @IsEnum(['categoryId', 'title', 'created', 'modified'])
  @Transform(v => (v === 'category' ? 'categoryId' : v))
  sortBy?: string

  @IsOptional()
  @IsEnum([1, -1])
  @ValidateIf(o => o.sortBy)
  @Transform(v => ~~v)
  @Field(() => SortOrder)
  sortOrder?: SortOrder

  @IsOptional()
  @IsInt()
  @Field(() => Int)
  year?: number
}

export enum SortOrder {
  DESC = -1,
  ASC = 1,
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
})
