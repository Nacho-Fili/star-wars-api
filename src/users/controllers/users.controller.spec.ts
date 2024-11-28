import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  it('Should return true', () => {
    expect(usersController.login()).toBe(true);
  });

  it('Should return true', () => {
    expect(usersController.signUp()).toBe(true);
  });
});
