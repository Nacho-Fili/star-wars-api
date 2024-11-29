import { IsNumberString, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  title: string;
  @IsNumberString()
  episodeId: number;
  @IsString()
  openingCrawl: string;
  @IsString()
  director: string;
  @IsString()
  producer: string;
  @IsString()
  releaseDate: string;
}
