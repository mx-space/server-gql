/*
 * @Author: Innei
 * @Date: 2020-04-30 12:21:51
 * @LastEditTime: 2020-10-02 11:31:01
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/auth/jwt.strategy.ts
 * @Coding with Love
 */

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthenticationError } from 'apollo-server-express'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { AuthService } from './auth.service'
import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET || 'asdhaisouxcjzuoiqdnasjduw',
      ignoreExpiration: false,
    } as StrategyOptions)
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.verifyPayload(payload)
    if (user) {
      return user
    }
    throw new AuthenticationError('身份已过期')
  }
}
