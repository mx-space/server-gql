/*
 * @Author: Innei
 * @Date: 2020-10-02 14:45:58
 * @LastEditTime: 2020-10-02 15:48:38
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/shared/notes/notes.input.ts
 * @Mark: Coding with Love
 */
import { ArgsType, Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Transform } from 'class-transformer'
import { IsInt, IsMongoId, IsOptional, IsString, Min } from 'class-validator'
import { PagerModel, PagerModelImplements } from 'src/graphql/models/base.model'
import { NoteItemModel } from 'src/graphql/models/note.model'

@ArgsType()
export class NidOrIdArgsDto {
  @IsInt()
  @Field(() => Int)
  @Min(1)
  @IsOptional()
  @Transform(v => ~~v)
  nid?: number

  @Field(() => ID)
  @IsMongoId()
  @IsOptional()
  id?: string
}

@ArgsType()
export class PasswordArgsDto {
  @IsString()
  @IsOptional()
  password?: string
}

@ObjectType()
export class NotePagerModel implements PagerModelImplements {
  data: NoteItemModel[]
  pager: PagerModel
}
