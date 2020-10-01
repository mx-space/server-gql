import { TextImageRecordType } from '@libs/db/models/base.model'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export abstract class BaseGLModel {
  @Field(() => ID)
  public readonly _id!: string

  @Field()
  public readonly created: Date

  @Field()
  public readonly modified: Date
}

@ObjectType()
export class ImageRecordModel implements TextImageRecordType {
  height: number

  width: number

  src: string

  type?: string
}

@ObjectType()
export class PostItemCount {
  like?: number

  read?: number
}
