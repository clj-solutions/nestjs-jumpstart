import { Test, TestingModule } from '@nestjs/testing';
import AuthRegisterService from './auth.register.service';

describe('AuthRegisterService', () => {
  let service: AuthRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRegisterService],
    }).compile();

    service = module.get<AuthRegisterService>(AuthRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
