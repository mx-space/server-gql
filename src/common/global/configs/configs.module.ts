/*
 * @Author: Innei
 * @Date: 2020-05-08 17:02:08
 * @LastEditTime: 2020-10-01 13:51:34
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/common/global/configs/configs.module.ts
 * @Copyright
 */

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigsService } from './configs.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ConfigsService],
  exports: [ConfigsService],
})
export class ConfigsModule {}
