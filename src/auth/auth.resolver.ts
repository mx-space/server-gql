/*
 * @Author: Innei
 * @Date: 2020-10-02 16:22:59
 * @LastEditTime: 2020-10-02 21:44:26
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/auth/auth.resolver.ts
 * @Mark: Coding with Love
 */
import { UserDocument } from '@libs/db/models/user.model'
import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/core/decorators/current-user.decorator'
import { Master } from 'src/core/decorators/guest.decorator'
import { MasterModel } from 'src/graphql/models/master.model'
import { getAvatar } from 'src/utils'
import { AuthService } from './auth.service'
import { LoginDto } from './dtos/auth.input'
import { ValidPayloadModel } from './dtos/payload.model'
import { GqlAuthLocalGuard } from './gql-auth.guard'
import { RolesGuard } from './roles.guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => ValidPayloadModel)
  @UseGuards(RolesGuard)
  checkLogged(@Master() isMaster: boolean) {
    return {
      ok: ~~isMaster,
      isGuest: !isMaster,
    }
  }

  @Query(() => MasterModel)
  @UseGuards(GqlAuthLocalGuard)
  async login(
    @Args('input') args: LoginDto,
    @CurrentUser() user: UserDocument,
  ) {
    const { name, username, created, url, mail } = user
    const avatar = user.avatar ?? getAvatar(mail)

    return {
      token: await this.authService.signToken(user._id),
      name,
      username,
      created,
      url,
      mail,
      avatar,
      expiresIn: 7,
    }
  }
}
