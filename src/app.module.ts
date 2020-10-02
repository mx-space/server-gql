/*
 * @Author: Innei
 * @Date: 2020-10-01 13:12:26
 * @LastEditTime: 2020-10-01 21:02:51
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/app.module.ts
 * @Mark: Coding with Love
 */
import { DbModule } from '@libs/db'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigsModule } from './common/global/configs/configs.module'
import { SharedModule } from './shared/shared.module'
import { isDev } from './utils'

@Module({
  imports: [
    ConfigsModule,
    DbModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
