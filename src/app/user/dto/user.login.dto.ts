import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  public readonly username: string

  @IsString()
  @IsNotEmpty()
  public readonly password: string
}
