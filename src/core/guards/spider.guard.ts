/*
 * @Author: Innei
 * @Date: 2020-04-30 19:09:37
 * @LastEditTime: 2020-10-01 20:14:13
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/core/guards/spider.guard.ts
 * @Coding with Love
 */

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'

import { Observable } from 'rxjs'

@Injectable()
export class SpiderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp()
    const request = http.getRequest()
    const headers = request.headers
    // const { referer } = headers
    const ua: string = headers['user-agent'] || ''
    const isSpiderUA = !!ua.match(/(Scrapy|Curl|HttpClient|python|requests)/i)
    if (ua && !isSpiderUA) {
      return true
    }
    throw new ForbiddenException('爬虫, 禁止')
  }
}
