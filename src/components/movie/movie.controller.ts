import { Application, Router, Request, Response } from 'express';
import { MovieRepository } from './movie.repository';
import { json } from 'body-parser';
import { IMovie } from './model/movie.interface';

export class MovieController {
  router: Router;

  constructor(app: Application, private repository: MovieRepository) {
    this.router = Router();

    app.use('/movies', this.router);
  }

  registerRoutes() {
    this.router.get('/:duration',
      (req: Request, res: Response) => {
        let genres = req.query.genres as string[];

        const duration = parseInt(req.params.duration);

        if (!genres) {
          genres = [];
        }

        if (!Array.isArray(genres)) {
          return res.status(400).send('Genres must be an array');
        }

        if (isNaN(duration)) {
          return res.status(400).send('Duration must be a number');
        }

        res.status(200)
          .json(this.repository.getMoviesByDurationAndGenres(duration, genres));
      });

    this.router.post('/', json, (req: Request, res: Response) => {
      const movie: IMovie = req.body;
    });
  }
}