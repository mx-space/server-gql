/*
 * @Author: Innei
 * @Date: 2020-10-02 21:43:32
 * @LastEditTime: 2020-10-02 21:44:06
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/auth/gql-auth.guard.ts
 * @Mark: Coding with Love
 */
import { Injectable, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}

@Injectable()
export class GqlAuthLocalGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
