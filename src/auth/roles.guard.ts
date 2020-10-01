/*
 * @Author: Innei
 * @Date: 2020-09-17 14:04:22
 * @LastEditTime: 2020-10-01 21:09:57
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/auth/roles.guard.ts
 * @Mark: Coding with Love
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { IncomingMessage } from 'http'
/**
 * 区分游客和主人的守卫
 */

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request: IncomingMessage = ctx.getContext().req

    let isMaster = false
    if (request.headers['authorization']) {
      try {
        isMaster = (await super.canActivate(context)) as boolean
      } catch {}
    }
    // @ts-ignore
    request.isGuest = !isMaster
    // @ts-ignore
    request.isMaster = isMaster

    return true
  }
}
