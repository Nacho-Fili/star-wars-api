import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../schemas/movie.schema';
import { CreateMovieDTO } from '../dto/createMovie.dto';
import { UpdateMovieDTO } from '../dto/updateMovie.dto';
import { MovieDTO } from '../dto/movie.dto';
import dayjs from 'dayjs';

@Injectable()
export class MoviesProvider {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getById(id: number): Promise<MovieDTO> {
    const document = await this.movieModel
      .findOne({
        episodeId: id,
      })
      .exec();

    if (!document) {
      throw new NotFoundException();
    }

    return MovieDTO.fromDocument(document);
  }

  async getAll(): Promise<MovieDTO[]> {
    const movies = await this.movieModel.find().exec();
    return movies.map(MovieDTO.fromDocument);
  }

  async create(movieToCreate: CreateMovieDTO) {
    const episodeIdExists = await this.movieModel
      .findOne({ episodeId: movieToCreate.episodeId })
      .exec();

    if (episodeIdExists) {
      throw new BadRequestException('Episode id already exists');
    }

    const createdMovie = new this.movieModel(movieToCreate);
    const savedMovie = await createdMovie.save();

    return MovieDTO.fromDocument(savedMovie);
  }

  async update(movieId: number, movieToUpdate: UpdateMovieDTO) {
    const movieDocument: MovieDocument = await this.movieModel
      .findOneAndUpdate({ episodeId: movieId }, movieToUpdate, { new: true })
      .exec();

    if (!movieDocument) {
      throw new NotFoundException();
    }

    return MovieDTO.fromDocument(movieDocument);
  }

  async delete(movieToDeleteId: number) {
    const deleted = await this.movieModel
      .findOneAndDelete({ episodeId: movieToDeleteId })
      .exec();

    if (!deleted) {
      throw new NotFoundException();
    }

    return { success: true };
  }

  async sync() {
    await this.movieModel.deleteMany();
    const response = await fetch('https://swapi.dev/api/films');
    const { results } = await response.json();
    const models = results.map((movie) => {
      return new this.movieModel({
        title: movie.title,
        episodeId: movie.episode_id,
        openingCrawl: movie.opening_crawl,
        director: movie.director,
        producer: movie.producer,
        releaseDate: movie.release_date,
      });
    });

    await this.movieModel.insertMany(models);
  }
}
