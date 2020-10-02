/*
 * @Author: Innei
 * @Date: 2020-09-17 14:04:22
 * @LastEditTime: 2020-10-02 21:48:54
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/auth/local.strategy.ts
 * @Mark: Coding with Love
 */
import { User } from '@libs/db/models/user.model'
import { PassportStrategy } from '@nestjs/passport'
import { ReturnModelType } from '@typegoose/typegoose'
import { ForbiddenError } from 'apollo-server-express'
import { compareSync } from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose'
import { IStrategyOptions, Strategy } from 'passport-local'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions)
  }

  async validate(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).select('+password')

    if (!user) {
      await sleep(3000)
      throw new ForbiddenError('用户名不正确')
    }
    if (!compareSync(password, user.password)) {
      await sleep(3000)
      throw new ForbiddenError('密码不正确')
    }
    // console.log(user)
    return user
  }
}
