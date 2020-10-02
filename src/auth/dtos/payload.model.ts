/*
 * @Author: Innei
 * @Date: 2020-10-02 21:12:02
 * @LastEditTime: 2020-10-02 21:37:40
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/auth/dtos/payload.model.ts
 * @Mark: Coding with Love
 */
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ValidPayloadModel {
  @Field(() => Int)
  ok: number

  isGuest: boolean
}
