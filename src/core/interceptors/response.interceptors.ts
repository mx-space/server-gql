/*
 * @Author: Innei
 * @Date: 2020-10-02 13:38:46
 * @LastEditTime: 2020-10-04 09:54:46
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/core/interceptors/response.interceptors.ts
 * @Mark: Coding with Love
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnprocessableEntityException,
} from '@nestjs/common'
import { isArray } from 'lodash'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
export interface Response<T> {
  data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const reorganize = data => {
      if (!data) {
        throw new UnprocessableEntityException('数据丢失了(｡ ́︿ ̀｡)')
      }
      return !isArray(data) ? { ...JSON.parse(JSON.stringify(data)) } : { data }
    }

    return next.handle().pipe(
      map(data => {
        // console.log({ ok: 1, timestamp: new Date(), ...reorganize(data) })
        return typeof data === 'object' && data !== null
          ? { ok: 1, timestamp: new Date(), ...reorganize(data) }
          : data
      }),
    )
  }
}
