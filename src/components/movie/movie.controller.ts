import { Application, Router, Request, Response } from 'express';
import { MovieRepository } from './movie.repository';
import { json } from 'body-parser';
import { IMovie } from './model/movie.interface';
import { GenreRespository } from '../genre/genre.respository';

export class MovieController {
  router: Router;

  constructor(app: Application,
              private movieRepository: MovieRepository,
              private genreRepository: GenreRespository) {
    this.router = Router();

    app.use('/movies', this.router);
  }

  private static validateRequiredString(value: string, key: string): { field: string, message: string } {

    return (!value || (value && value.length > 255)) ? {
      field: `${key}`,
      message: `Movie ${key} is required and cannot be longer then 255 characters`,
    }: {} as { field: string, message: string };
  }

  private static validateRequiredNumber(value: any, key: string): { field: string, message: string } {

    return (!value || !Number.isInteger(value)) ? {
      field: `${key}`,
      message: `Movie ${key} is required and must be a finite number`,
    }: {} as { field: string, message: string };
  }

  private static validateOptionalString(value: any, key: string): { field: string, message: string } {

    return (typeof value !== 'string') ? {
      field: `${key}`,
      message: `Movie ${key} must be a string`,
    }: {} as { field: string, message: string };
  }

  validateMovie(movie: {[key: string]: any}): { field: string, message: string }[] {
    const errors = [];
    const allGenres = this.genreRepository.getGenres();

    for (const genre of movie.genres) {
      if (!allGenres.some((repoGenre) => repoGenre === genre)) {

        errors.push({
          field: 'genre',
          message: `Genre ${genre} is not present in: [ ${allGenres.join(', ')} ]`,
        })

        break;
      }
    }

    for (let key in movie) {

      switch(key) {
        case 'title':
        case 'director':
          const stringError = MovieController.validateRequiredString(movie[key], key);
          stringError.field ? errors.push(stringError): {};

          break;
        case 'year':
        case 'runtime':
          const numberError = MovieController.validateRequiredNumber(movie[key], key);
          numberError.field ? errors.push(numberError): {};

          break;
        case 'id':
        case 'genres':
          break;
        default:
          const optionalError = MovieController.validateOptionalString(movie[key], key);
          optionalError.field ? errors.push(optionalError): {};

          break;
      }
    }

    return errors;
  }

  registerRoutes() {
    this.router.get('/byDuration/:duration',
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

        try {
          const movies = this.movieRepository.getMoviesByDurationAndGenres(duration, genres);

          res.status(200).json(movies);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });

    this.router.post('/',
      json(), (req: Request, res: Response) => {
        const movie: IMovie = req.body;
        const errors = this.validateMovie(movie);

        if (errors.length) {
          return res.status(400).json(errors);
        }

        try {
          const createdMovie = this.movieRepository.addMovie(movie);

          res.status(200).json(createdMovie);
        } catch (err) {
          res.status(400).send(err.message);
        }
    });
  }
}