import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';

describe('MoviesController', () => {
  let moviesController: MoviesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
    }).compile();

    moviesController = app.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(moviesController).toBeDefined();
  });

  it('Should return true', async () => {
    const movies = await moviesController.getMovies();
    expect(movies).toEqual(expect.arrayContaining([]));
  });

  it('Should return true', async () => {
    const movieId = await moviesController.getMovie('id');
    expect(movieId).toBe('id');
  });

  it('Should return the data', async () => {
    const createdMovie = await moviesController.createMovie({
      name: 'Star Wars III',
    });

    expect(createdMovie).toEqual(
      expect.objectContaining({
        name: 'Star Wars III',
      }),
    );
  });

  it('Should return the data and the id', async () => {
    const updatedMovie = await moviesController.updateMovie('id', {
      name: 'Star Wars IV',
    });

    expect(updatedMovie).toEqual(
      expect.objectContaining({
        id: 'id',
        name: 'Star Wars IV',
      }),
    );
  });
});
