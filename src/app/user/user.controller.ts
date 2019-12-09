import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserLoginDto } from './dto/user.login.dto';
import { User } from './user.entity'

@Controller()
export class UserController {
  public async login(@Body() loginDto: UserLoginDto): Promise<User> {
    
  }
}
