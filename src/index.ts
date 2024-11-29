import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as functions from 'firebase-functions';
import express from 'express';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const server = express();

export const createNestServer = async (expressInstance) => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance),
    )
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
        .setTitle('Star Wars Movies API')
        .setVersion('1.0')
        .addTag('Movies')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    return app.init()
}

createNestServer(server).then(() => console.log('Nest ready')).catch((err) => console.log('Nest broken', err))

export const api = functions.https.onRequest(server);
