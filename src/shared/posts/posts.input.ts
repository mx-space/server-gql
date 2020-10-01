import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'
import { PagerModelImplements, PagerModel } from 'src/graphql/models/base.model'
import { PostItemModel } from 'src/graphql/models/post.model'

@ArgsType()
export class SlugTitleInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  category: string

  @IsString()
  @IsNotEmpty()
  @Field()
  slug: string
}

@ObjectType()
export class PostPagerArgs implements PagerModelImplements {
  @Field(() => PagerModel)
  pager: PagerModel
  @Field(() => [PostItemModel])
  data: PostItemModel[]
}
