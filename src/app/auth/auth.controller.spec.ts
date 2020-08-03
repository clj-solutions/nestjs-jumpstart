import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Logger, LoggerService } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';
import { Repository } from 'typeorm';
import factory from '../user/user.factory';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { AuthTokenDto } from './dto/auth.token.dto'
import { JWT_SECRET } from './secret.key';
import { TYPEORM_MODULE_OPTIONS } from '../../config/database';

describe('AuthController', () => {
  const repository: Repository<User> = new Repository<User>();
  const service: AuthService = new AuthService(new JwtService({
    secret: JWT_SECRET,
    signOptions: { expiresIn: '3h' }
  }), repository);
  const controller: AuthController = new AuthController(service, new Logger());
  const repositoryUser = [];

  beforeEach(async () => {
    jest.clearAllMocks();

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('should register a user with valid params', () => {
    const user = factory.build();
  });

});
