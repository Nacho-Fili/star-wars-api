import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('/movies')
export class MoviesController {
  @Get('/')
  getMovies(): Promise<any[]> {
    return Promise.resolve([]);
  }

  @Get('/:id')
  getMovie(@Param('id') id: string): Promise<string> {
    return Promise.resolve(id);
  }

  @Post('/')
  createMovie(@Body() data: Record<string, string>) {
    return Promise.resolve(data);
  }

  @Put('/:id')
  updateMovie(@Param('id') id: string, data: Record<string, string>) {
    return Promise.resolve({ id, ...data });
  }
}
