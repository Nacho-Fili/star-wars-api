import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { MoviesProvider } from './services/movies.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  providers: [MoviesProvider],
  controllers: [MoviesController],
})
export class MoviesModule {}
