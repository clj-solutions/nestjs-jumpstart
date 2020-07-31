import { Test, TestingModule } from '@nestjs/testing';
import AuthRegisterService from './auth.register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { AuthRegisterDto } from '../dto/auth.register.dto';
import { AuthService } from '../auth.service';
import factory from '../../user/user.factory';

describe('AuthRegisterService', () => {
  const repository: Repository<User> = new Repository<User>();
  const service = new AuthRegisterService(repository);
  let userRepository: Array<User> = [];
  const testRepositorySize = 5;
  const mockRepositoryFindOne = (params: any): Promise<User> => {
    return new Promise(resolve => {
      const existingUser = userRepository.find(u => u.email === params.email);
      resolve(existingUser);
    })
  }
  const mockRepositorySave = (params: User): Promise<User> => {
    return new Promise(resolve => {
      userRepository.push(params);
      resolve(userRepository[userRepository.length-1]);
    })
  }

  const repositoryFindOneSpy = jest.spyOn(repository, 'findOne')
  .mockImplementation(mockRepositoryFindOne);
  const repositorySaveSpy = jest.spyOn(repository, 'save')
  .mockImplementation(mockRepositorySave);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('call', () => {
    beforeEach(async () => {
      userRepository = [];
      for(let i=0; i<testRepositorySize; i++) {
        userRepository.push(factory.build());
      }
    })

    it('should add a new user into users repository.', async() => {
      const user = factory.build();
      const authRegisterDto = {email: user.email, firstName: user.firstName, 
      lastName: user.lastName, password: "password"};

      await service.call(authRegisterDto);
      expect(repositoryFindOneSpy).toHaveBeenCalled();
      expect(repositorySaveSpy).toHaveBeenCalled();
    })
  });  
});
