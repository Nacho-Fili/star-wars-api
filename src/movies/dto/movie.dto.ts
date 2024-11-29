import { MovieDocument } from '../schemas/movie.schema';

export class MovieDTO {
  id: number;
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;

  static fromDocument(document: MovieDocument): MovieDTO {
    return {
      id: document.episodeId,
      producer: document.producer,
      title: document.title,
      episodeId: document.episodeId,
      openingCrawl: document.openingCrawl,
      director: document.director,
      releaseDate: document.releaseDate,
    };
  }
}
