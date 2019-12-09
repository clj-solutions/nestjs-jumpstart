import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { UserLoginDto } from './dto/user.login.dto';
import { User } from './user.entity'
import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  public async login(@Body() loginDto: UserLoginDto): Promise<User> {
    const _user = await this.userService.findOne(loginDto);
    const errors = {User: ' not found'};
    if(!_user) throw new HttpException({errors}, 401);


  }
}
