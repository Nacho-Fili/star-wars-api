import { Test, TestingModule } from '@nestjs/testing';
import { MoviesProvider } from './movies.provider';

describe('MoviesController', () => {
  let moviesProvider: MoviesProvider;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MoviesProvider],
    }).compile();

    moviesProvider = app.get<MoviesProvider>(MoviesProvider);
  });

  it('should be defined', () => {
    expect(moviesProvider).toBeDefined();
  });
});
