import { Test, TestingModule } from '@nestjs/testing';
import AuthLoginService from './auth.login.service';
import { JwtModule } from '@nestjs/jwt'
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.entity';
import { AuthTokenDto } from '../dto/auth.token.dto';
import factory from '../../user/user.factory';

describe('AuthLoginService', () => {
  let service: AuthLoginService;
  const user: User = factory.build();
  let authTokenDto: AuthTokenDto;
  const testTokenValue = "randomized-token-2324234234232342";
  const jwtServiceSignSpy = JwtService.prototype.sign = jest.fn(() => {
    return testTokenValue;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
        JwtModule.register({
        secret: 'no need secret key here',
        signOptions: { expiresIn: '3h'}
      }) ],
      providers: [AuthLoginService],
    }).compile();

    service = module.get<AuthLoginService>(AuthLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call JwtService.sign() method once.', async () => {
    authTokenDto = await service.call(user);
    expect(jwtServiceSignSpy).toHaveBeenCalled();
  })

  it('should return auth-token-dto.', async () => {
    authTokenDto = await service.call(user);
    expect(authTokenDto.token).toBe(testTokenValue);
    expect(authTokenDto.uid).toBe(user.id);
  })

});
