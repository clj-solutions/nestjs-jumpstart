import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth, } from '@nestjs/swagger'
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
  public async profile(@Req() req) {
    return this.userService.find(req.user.id);
  }
}
