import { MovieController } from './movie/movie.controller';
import { Application } from 'express';

export class Router {
  static registerRoutes(app: Application) {
    const movieController = new MovieController(app);

    movieController.registerRoutes();
  }
}