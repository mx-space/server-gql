import { IsDate, IsOptional, IsString, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

/*
 * @Author: Innei
 * @Date: 2020-10-01 20:20:27
 * @LastEditTime: 2020-10-01 20:20:40
 * @LastEditors: Innei
 * @FilePath: /mx-server-next/src/auth/dtos/token.model.ts
 * @Mark: Coding with Love
 */
export class TokenDto {
  @IsDate()
  @IsOptional()
  @Transform(v => new Date(v))
  expired?: Date

  @IsString()
  @IsNotEmpty()
  name: string
}
