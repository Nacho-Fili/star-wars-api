import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserRoles } from '../../enums/userRoles.enum';
import { UsersProvider } from '../services/users.provider';
import { UsersProviderMock } from '../services/users.provider.mock';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersProvider,
          useClass: UsersProviderMock,
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('Should return true', async () => {
    const signUpResult = await usersController.signUp({
      username: 'Snape',
      password: 'Alohomora',
    });
    expect(signUpResult).toEqual(
      expect.objectContaining({
        username: 'Snape',
        role: UserRoles.REGULAR,
      }),
    );
  });
});
