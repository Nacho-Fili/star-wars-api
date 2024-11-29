import { CreateMovieDTO } from '../dto/createMovie.dto';
import { UpdateMovieDTO } from '../dto/updateMovie.dto';
import { MovieDTO } from '../dto/movie.dto';

export class MoviesProviderMock {
  create(movieToCreate: CreateMovieDTO): Promise<MovieDTO> {
    return Promise.resolve({ ...movieToCreate, id: movieToCreate.episodeId });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(_: number): Promise<{ success: boolean }> {
    return Promise.resolve({ success: true });
  }

  getAll(): Promise<MovieDTO[]> {
    return Promise.resolve([]);
  }

  async getById(id: number): Promise<MovieDTO> {
    return Promise.resolve({
      id,
      episodeId: id,
      producer: '',
      title: '',
      director: '',
      openingCrawl: '',
      releaseDate: '',
    });
  }

  sync(): Promise<void> {
    return Promise.resolve();
  }

  async update(
    movieId: number,
    movieToUpdate: UpdateMovieDTO,
  ): Promise<MovieDTO> {
    return Promise.resolve({
      ...(await this.getById(movieId)),
      ...movieToUpdate,
    });
  }
}
