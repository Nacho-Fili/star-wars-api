import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let appController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    appController = app.get<UsersController>(UsersController);
  });

  it('Should return true', () => {
    expect(appController.login()).toBe(true);
  });

  it('Should return true', () => {
    expect(appController.signUp()).toBe(true);
  });
});
