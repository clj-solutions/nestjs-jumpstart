import { Test, TestingModule } from '@nestjs/testing';
import AuthValidateUserService from './auth.validate-user.service';

describe('AuthValidateUserService', () => {
  let service: AuthValidateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthValidateUserService],
    }).compile();

    service = module.get<AuthValidateUserService>(AuthValidateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
