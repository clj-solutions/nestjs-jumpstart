import { UserController } from './user.controller';
import { Repository } from 'typeorm'
import { User } from './user.entity'
import factory from './user.factory'
import { UserService } from './users.service'


describe('UserController', () => {
  const repository = new Repository<User>();
  const service = new UserService(repository);
  const controller = new UserController(service);
  const user = factory.build();

  const spyUserServiceFind = jest.spyOn(service, 'find')
  .mockImplementation(() => Promise.resolve(user));

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('profile should return a user.', async() => {
    const request = {user: user};
    const returnedUser = await controller.profile(request);
    expect(returnedUser).toBe(user)
  });

});
