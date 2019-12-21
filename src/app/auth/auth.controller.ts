import { Controller, Inject, Logger, LoggerService, Post, HttpStatus, Body, HttpCode, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthRegisterDto } from './dto/auth.register.dto'
import { AuthLoginDto } from './dto/auth.login.dto'

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService)
    {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description: 'Signup endpoint for authentication'
  })
  public async register(@Body() params: AuthRegisterDto): Promise<any> {
    try {
      const user = await this.authService.register(params)

      return this.authService.login(user)
    } catch(e) {
      throw new BadRequestException(e.message)
    }
  }

  
}
