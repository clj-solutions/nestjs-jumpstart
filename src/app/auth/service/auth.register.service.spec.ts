import AuthRegisterService from './auth.register.service';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
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
      jest.clearAllMocks();
    })

    it('should add a new user into users repository.', async () => {
      const user = factory.build();
      const authRegisterDto = {email: user.email, firstName: user.firstName, 
      lastName: user.lastName, password: "password"};

      const newUser = await service.call(authRegisterDto);
      expect(repositoryFindOneSpy).toHaveBeenCalled();
      expect(repositorySaveSpy).toHaveBeenCalled();
      expect(userRepository.length).toBe(testRepositorySize + 1);
      expect(newUser.passwordHash).not.toBe('');
    })

    it('should thrown an error while trying to register same email.', async () => {
      const user = factory.build();
      user.email = userRepository[0].email;

      const authRegisterDto = {email: user.email, firstName: user.firstName, lastName: user.lastName, password: "password"};
      service.call(authRegisterDto).catch(e => {
        expect(e.message).toMatch(/already/);
      })
      
      expect(repositoryFindOneSpy).toHaveBeenCalled();
      expect(repositorySaveSpy).not.toHaveBeenCalled();
    });

  });  
});
