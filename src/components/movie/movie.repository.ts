import { IMovie } from './model/movie.interface';
import { JsonDB } from 'node-json-db';


export class MovieRepository {
  constyructor() {}

  readMovies(): IMovie[] {
    return [];
  }

  private getMatching(movie: IMovie, duration: number, genres: string[]): { match: number, isMatch: boolean } {
    const matching = {
      match: 0,
      isMatch: true
    };
    const movieDuration = parseInt(movie.runtime);

    if (duration) {
      if (!(movieDuration >= duration - 10 && movieDuration <= duration+10)) {
        matching.isMatch = false;

        return matching;
      }
    }


    for (const genre of movie.genres) {
      if (genres.some((gen) => genre === gen)) {
        matching.match++;
      }
    }

     return matching;
  }

  getMoviesByDurationAndGenres(duration: number = 0, genres: string[] = []): IMovie[] {
    let movies = this.readMovies();
    if (!genres.length) {
      if (duration) {
        movies =  movies.filter((movie) => {
          const movieDuration = parseInt(movie.runtime);

          return movieDuration >= duration - 10 && movieDuration <= duration+10;
        })
      }

      const randomMovieIndex = Math.floor(Math.random() * movies.length);

      return [movies[randomMovieIndex]];
    }

    return Array.from(movies
      .reduce((acc, movie) => {
        const matching = this.getMatching(movie, duration, genres);

        if (!matching.isMatch) {

          return acc;
        }

        const movieGenres = movie.genres.join('');
        let movieGrouping = acc.get(movieGenres);

        if (!movieGrouping) {

          movieGrouping = {
            match: matching.match,
            movies: [],
          }
        }

        movieGrouping.movies.push(movie);
        acc.set(movieGenres, movieGrouping);

        return acc
      }, new Map<string, { match: number, movies: IMovie[] }>())
      .values())
      .sort((a, b) =>  b.match - a.match)
      .reduce((acc: IMovie[], match) => [ ...acc, ...match.movies], [])
  }
}