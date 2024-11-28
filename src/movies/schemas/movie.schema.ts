import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;
@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  episodeId: number;
  @Prop({ required: true })
  openingCrawl: string;
  @Prop({ required: true })
  director: string;
  @Prop({ required: true })
  producer: string;
  @Prop({ required: true })
  releaseDate: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
