/*
 * @Author: Innei
 * @Date: 2020-10-01 13:12:26
 * @LastEditTime: 2020-10-02 13:41:40
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/main.ts
 * @Mark: Coding with Love
 */
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseInterceptor } from './core/interceptors/response.interceptors'
import { isDev } from './utils'
const APIVersion = 2
const PORT = parseInt(process.env.PORT) || 2331
const Origin = process.env.ORIGIN || null
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const hosts = Origin.split(',').map(host => new RegExp(host, 'i'))

  app.enableCors({
    origin: (origin, callback) => {
      const allow = hosts.some(host => host.test(origin))

      callback(null, allow)
    },
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: 422,
    }),
  )
  app.useGlobalInterceptors(new ResponseInterceptor())

  app.setGlobalPrefix(isDev ? '' : `api/v${APIVersion}`)

  await app.listen(PORT, async () => {
    if (isDev) {
      Logger.debug('Server listen on ' + `http://localhost:${PORT}`)
      Logger.debug(
        'GraphQL playground listen on ' + `http://localhost:${PORT}/graphql`,
      )
    }
  })
}
bootstrap()
