import { JwtService } from '@nestjs/jwt';
import { Logger, BadRequestException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';
import { Repository } from 'typeorm';
import factory from '../user/user.factory';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { AuthTokenDto } from './dto/auth.token.dto'
import { JWT_SECRET } from './secret.key';

describe('AuthController', () => {
  const repository: Repository<User> = new Repository<User>();
  const service: AuthService = new AuthService(new JwtService({
    secret: JWT_SECRET,
    signOptions: { expiresIn: '3h' }
  }), repository);
  const controller: AuthController = new AuthController(service, new Logger());
  let repositoryUser: Array<User> = [];

  // prepare mock function for repository
  const mockRepositoryFindOne = (params: any): Promise<User> => {
    return new Promise(resolve => {
      const existingUser = repositoryUser.find(u => u.email === params.email);
      resolve(existingUser);
    })
  }
  const repositoryFindOneSpy = jest.spyOn(repository, "findOne")
  .mockImplementation(mockRepositoryFindOne);
  const mockRepositorySave = (params: User): Promise<User> => {
    return new Promise(resolve => {
      repositoryUser.push(params);
      resolve(repositoryUser[repositoryUser.length-1]);
    })
  }
  const repositorySaveSpy = jest.spyOn(repository, 'save')
  .mockImplementation(mockRepositorySave); 

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      // prepare user table
      const user = factory.build();
      repositoryUser = [];
      repositoryUser.push(user);
    });

    it('should throw an error while trying to add an exsisting user.', async () => {
      const existingUser = repositoryUser[0];
      const {email, firstName, lastName, ...restFields} = existingUser;

      const registerDto: AuthRegisterDto = {email, firstName, lastName, password: "any password"};
      expect.assertions(4);
      try{
        await controller.register(registerDto);
      } catch(e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
      
      expect(repositoryFindOneSpy).toHaveBeenCalledTimes(1);
      expect(repositorySaveSpy).not.toHaveBeenCalled();
      expect(repositoryUser.length).toBe(1);
    });

    it('should add a valid user into database and return token.', async () => {
      const newUser = factory.build();
      const {email, firstName, lastName, ...restFields} = newUser;
      const registerDto: AuthRegisterDto = {email, firstName, lastName, password: "secure password"};
      let returnData: any;

      expect.assertions(5);
      try{
        returnData = await controller.register(registerDto);
      } catch(e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
      
      expect(repositoryFindOneSpy).toHaveBeenCalledTimes(1);
      expect(repositorySaveSpy).toHaveBeenCalled();
      expect(repositoryUser.length).toBe(2);
      expect(returnData).toBeInstanceOf(AuthTokenDto);
      expect(returnData.token).not.toBe("");
    })

  });

  describe("login", () => {
    beforeEach(async () => {
      jest.clearAllMocks();
    })

    it('should return a token.', async () => {
      const user2 = factory.build();
      const request = {user: user2};
      let tokenDto: any;
      try{
      tokenDto = await controller.login(request);
      } catch(e) {
      }

      expect(tokenDto).toBeInstanceOf(AuthTokenDto);
    });

  })

});
