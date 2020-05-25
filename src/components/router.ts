import { MovieController } from './movie/movie.controller';
import { Application } from 'express';
import { MovieRepository } from './movie/movie.repository';
import { JsonDB } from 'node-json-db';

export class Router {
  static registerRoutes(app: Application, db: JsonDB) {
    const repository: MovieRepository = new MovieRepository(db);
    const movieController = new MovieController(app, repository);

    movieController.registerRoutes();
  }
}