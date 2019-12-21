import { IsString, IsEmail, IsNotEmpty, } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthRegisterDto {
  @ApiProperty({
    name: 'firstName',
    description: 'First name of the new user'
  })
  @IsNotEmpty()
  public readonly firstName: string

  @ApiProperty({
    name: 'lastName',
    description: 'Last name of the new user'
  })
  @IsNotEmpty()
  public readonly lastName: string

  @ApiProperty({
    name: 'email',
    description: 'email address of the new user'
  })
  @IsEmail()
  public readonly email: string

  @ApiProperty({
    name: 'password',
    description: 'password of the new user'
  })
  @IsString()
  public readonly password: string
}
