import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDTO } from '../dto/createMovie.dto';
import { UpdateMovieDTO } from '../dto/updateMovie.dto';
import { MovieDTO } from '../dto/movie.dto';
import { MoviesProvider } from '../services/movies.provider';
import { IsPublic } from '../../auth/decorators/isPublic.decorator';
import { RolesGuard } from '../../auth/guards/rolesGuard.service';
import { AllowedRoles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../enums/userRoles.enum';

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

  @UseGuards(RolesGuard)
  @AllowedRoles([UserRoles.ADMIN])
  @Post('/')
  createMovie(@Body() data: CreateMovieDTO): Promise<MovieDTO> {
    return this.moviesProvider.create(data);
  }

  @UseGuards(RolesGuard)
  @AllowedRoles([UserRoles.ADMIN])
  @Put('/:id')
  updateMovie(
    @Param('id') id: number,
    @Body() updateMovieDTO: UpdateMovieDTO,
  ): Promise<MovieDTO> {
    return this.moviesProvider.update(id, updateMovieDTO);
  }

  @UseGuards(RolesGuard)
  @AllowedRoles([UserRoles.ADMIN])
  @Delete('/:id')
  deleteMovie(@Param('id') id: number) {
    return this.moviesProvider.delete(id);
  }

  @UseGuards(RolesGuard)
  @AllowedRoles([UserRoles.ADMIN])
  @Post('/sync')
  async syncMovies() {
    await this.moviesProvider.sync();
    return { success: true };
  }
}
