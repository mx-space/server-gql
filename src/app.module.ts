/*
 * @Author: Innei
 * @Date: 2020-10-01 13:12:26
 * @LastEditTime: 2020-10-01 13:55:27
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/app.module.ts
 * @Mark: Coding with Love
 */
import { DbModule } from '@libs/db'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { isDev } from './utils'
import { SharedModule } from './shared/shared.module'
import { ConfigsModule } from './common/global/configs/configs.module'
import { join } from 'path'

@Module({
  imports: [
    ConfigsModule,
    DbModule,
    GraphQLModule.forRoot({
      debug: isDev,
      playground: isDev,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
