import { IMovie } from './model/movie.interface';
import { JsonDB } from 'node-json-db';

export class MovieRepository {

  constructor(private db: JsonDB) {}

  readMovies(): IMovie[] {
    return this.db.getData('/movies')
  }

  private isMathing(movie: IMovie, duration: number, genres: string[]): boolean {

    if (duration) {
      if (!(movie.runtime >= duration - 10 && movie.runtime <= duration+10)) {
        return false
      }
    }

    for (const genre of movie.genres) {
      if (genres.some((gen) => genre === gen)) {
        return true;
      }
    }

    return false;
  }

  private getMatchingLevel(movieGenres: string[], genres: string[]): number {
    let matching = 0;

    for (const genre of movieGenres) {
      if (genres.some((gen) => genre === gen)) {
        matching++;
      }
    }

    return matching;
  }

  getMoviesByDurationAndGenres(duration: number = 0, genres: string[] = []): IMovie[] {
    let movies = this.readMovies();

    if (!genres.length) {
      if (duration) {
        movies =  movies.filter((movie) => {

          return movie.runtime >= duration - 10 && movie.runtime <= duration+10;
        })
      }

      const randomMovieIndex = Math.floor(Math.random() * movies.length);

      return [movies[randomMovieIndex]];
    }

    return movies
      .filter((movie) => this.isMathing(movie, duration, genres))
      .sort((movieA, movieB) => {
        const ARating = this.getMatchingLevel(movieA.genres, genres);
        const BRating = this.getMatchingLevel(movieB.genres, genres);

        if (ARating !== BRating) {

          return BRating - ARating;
        }

        const genresA = movieA.genres.join(' ');
        const genresB = movieB.genres.join(' ');

        if (genresA < genresB) {

          return -1;
        }

        if (genresA > genresB) {

          return 1;
        }

        return 0;
      });
  }

  addMovie(movie: IMovie) {
    const movies = this.readMovies();
    movie.id = movies.length;



    this.db.push('/movies', movie, false)
  }
}