/*
 * @Author: Innei
 * @Date: 2020-10-01 13:12:26
 * @LastEditTime: 2020-10-03 10:42:35
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/app.module.ts
 * @Mark: Coding with Love
 */
import { DbModule } from '@libs/db'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './auth/auth.module'
import { ConfigsModule } from './common/global/configs/configs.module'
import { GlobalModule } from './common/global/global.module'
import { SharedModule } from './shared/shared.module'
import { isDev } from './utils'

@Module({
  imports: [
    ConfigsModule,
    DbModule,
    GlobalModule,
    GraphQLModule.forRoot({
      debug: isDev,
      playground: isDev,
      autoSchemaFile: 'schema.gql',
      // installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      // typePaths: ['./**/*.gql'],
      // autoSchemaFile: true,
    }),
    AuthModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
