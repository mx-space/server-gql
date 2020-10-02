import { InputType } from '@nestjs/graphql'
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

@InputType()
class UserOptionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly introduce?: string

  @IsEmail()
  @IsOptional()
  readonly mail?: string

  @IsUrl({ require_protocol: true }, { message: '请更正为正确的网址' })
  @IsOptional()
  readonly url?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsUrl({ require_protocol: true })
  @IsOptional()
  readonly avatar?: string

  @IsOptional()
  @IsObject()
  readonly socialIds?: Record<string, any>
}
@InputType()
export class UserDto extends UserOptionDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}

@InputType()
export class LoginDto {
  @IsString()
  username: string

  @IsString()
  password: string
}
@InputType()
export class UserPatchDto extends UserOptionDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly username: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly password: string
}
