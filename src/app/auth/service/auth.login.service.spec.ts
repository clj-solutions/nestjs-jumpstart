import { Test, TestingModule } from '@nestjs/testing';
import { Auth.LoginService } from './auth.login.service';

describe('Auth.LoginService', () => {
  let service: Auth.LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth.LoginService],
    }).compile();

    service = module.get<Auth.LoginService>(Auth.LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
