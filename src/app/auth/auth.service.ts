import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
import { AuthRegisterDto } from './dto/auth.register.dto'
import { JwtService } from '@nestjs/jwt'
import { AuthTokenDto } from './dto/auth.token.dto'
import AuthLoginService from './service/auth.login.service'
import AuthRegisterService from './service/auth.register.service'
import AuthValidateUserService from './service/auth.validate-user.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public async register(params: AuthRegisterDto): Promise<User> {
    return await new AuthRegisterService(this.userRepository).call(params);
  }

  public async login(user: User): Promise<AuthTokenDto> {
    return await new AuthLoginService(this.jwtService).call(user)
  }

  async validateUser(email: string, password: string): Promise<User> {
    
  }
}