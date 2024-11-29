import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMovieDTO } from '../dto/createMovie.dto';
import { UpdateMovieDTO } from '../dto/updateMovie.dto';
import { MovieDTO } from '../dto/movie.dto';
import { MoviesProvider } from '../services/movies.provider';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesProvider: MoviesProvider) {}

  @IsPublic()
  @Get('/')
  getMovies(): Promise<MovieDTO[]> {
    return this.moviesProvider.getAll();
  }

  @Get('/:id')
  getMovie(@Param('id') id: number): Promise<MovieDTO> {
    return this.moviesProvider.getById(id);
  }

  @Post('/')
  createMovie(@Body() data: CreateMovieDTO): Promise<MovieDTO> {
    return this.moviesProvider.create(data);
  }

  @Put('/:id')
  updateMovie(
    @Param('id') id: number,
    @Body() updateMovieDTO: UpdateMovieDTO,
  ): Promise<MovieDTO> {
    return this.moviesProvider.update(id, updateMovieDTO);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: number) {
    return this.moviesProvider.delete(id);
  }

  @Post('/sync')
  async syncMovies() {
    await this.moviesProvider.sync();
    return { success: true };
  }
}
