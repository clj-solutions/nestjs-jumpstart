import { Controller, Get, Post, Body, HttpException, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth, } from '@nestjs/swagger'
import { UserLoginDto } from './dto/user.login.dto';
import { User } from './user.entity'
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('User')
@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({description: 'Get user profile'})
  public async me(@Req() req: Request) {
    return this.userService.find
  }
}
