import { MovieController } from './movie/movie.controller';
import { Application } from 'express';
import { MovieRepository } from './movie/movie.repository';
import { JsonDB } from 'node-json-db';
import { GenreRespository } from './genre/genre.respository';

export class Router {
  static registerRoutes(app: Application, db: JsonDB) {
    const movieRepository: MovieRepository = new MovieRepository(db);
    const genreRespository: GenreRespository = new GenreRespository(db);

    const movieController = new MovieController(app, movieRepository, genreRespository);

    movieController.registerRoutes();
  }
}