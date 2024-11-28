import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../schemas/movie.schema';

@Injectable()
export class MoviesProvider {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  getAll(): Promise<MovieDocument[]> {
    return this.movieModel.find().exec();
  }
}
