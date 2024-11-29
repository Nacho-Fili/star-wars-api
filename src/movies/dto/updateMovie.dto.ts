import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDTO {
  @IsString()
  @IsOptional()
  title?: string;
  @IsNumberString()
  @IsOptional()
  episodeId?: number;
  @IsString()
  @IsOptional()
  openingCrawl?: string;
  @IsString()
  @IsOptional()
  director?: string;
  @IsString()
  @IsOptional()
  producer?: string;
  @IsString()
  @IsOptional()
  releaseDate?: string;
}
