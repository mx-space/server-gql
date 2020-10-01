/*
 * @Author: Innei
 * @Date: 2020-09-17 14:04:22
 * @LastEditTime: 2020-10-01 21:11:45
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/core/decorators/guest.decorator.ts
 * @Mark: Coding with Love
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const Guest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req
    return request.isGuest
  },
)

export const Master = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req
    return request.isMaster
  },
)
