import { Test, TestingModule } from '@nestjs/testing';
import { Auth.RegisterService } from './auth.register.service';

describe('Auth.RegisterService', () => {
  let service: Auth.RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth.RegisterService],
    }).compile();

    service = module.get<Auth.RegisterService>(Auth.RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
