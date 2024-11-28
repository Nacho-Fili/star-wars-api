import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@star-wars-movies.tpfwz.mongodb.net/${process.env.DB_NAME}`;

@Module({
  imports: [MongooseModule.forRoot(mongoUri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
