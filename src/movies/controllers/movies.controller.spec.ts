import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesProvider } from '../services/movies.provider';
import { MoviesProviderMock } from '../services/movies.provider.mock';

describe('MoviesController', () => {
  let moviesController: MoviesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesProvider, useClass: MoviesProviderMock }],
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
    const movie = await moviesController.getMovie(3);
    expect(movie.id).toBe(3);
  });

  it('Should return the data', async () => {
    const createdMovie = await moviesController.createMovie({
      title: 'Star Wars III',
      producer: 'McCallum',
      episodeId: 8,
      director: 'McCallum',
      openingCrawl: '',
      releaseDate: '12-28-2024',
    });

    expect(createdMovie).toEqual(
      expect.objectContaining({
        title: 'Star Wars III',
      }),
    );
  });

  it('Should return the data and the id', async () => {
    const updatedMovie = await moviesController.updateMovie(3, {
      title: 'Star Wars IV',
    });

    expect(updatedMovie).toEqual(
      expect.objectContaining({
        id: 3,
        title: 'Star Wars IV',
      }),
    );
  });
});
