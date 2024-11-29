import { IsNumberString, IsString } from 'class-validator';
import { DateIsValid } from '../../utils/decorators/dateIsValid';

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
  @DateIsValid()
  releaseDate: string;
}
