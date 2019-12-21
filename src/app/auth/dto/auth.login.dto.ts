import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthLoginDto {
  @ApiProperty({
    name: 'email',
    description: 'Email of user'
  })
  @IsNotEmpty()
  public readonly email: string

  @ApiProperty({
    name: 'password',
    description: 'Password of user'
  })
  @IsNotEmpty()
  public readonly password: string
}
