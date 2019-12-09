import { IsNotEmpty } from 'class-validator'

export class UserCreateDto {
  @IsNotEmpty()
  readonly username: string

  @IsNotEmpty()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}
