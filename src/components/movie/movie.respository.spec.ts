import 'jest';
import Mock from './movie.repository.spec.mock';
import { MovieRepository } from './movie.repository';
import { IMovie } from './model/movie.interface';

describe ('Movie repository spec', () => {
  let repository: MovieRepository, expectedFullSearch: IMovie[];

  beforeAll(() => {
    repository = Mock.repository;
    expectedFullSearch = Mock.expectedFullSearch;
  });

  it('It should properly search for movies By genres and length', () => {
    const movies = repository.getMoviesByDurationAndGenres(125, ['Crime', 'Music', 'Drama']);

    expect(movies).toEqual(expectedFullSearch)
  })

  it('It should properly search mmovies by length only', () => {
    const movies = repository.getMoviesByDurationAndGenres(0, ['Crime', 'Music', 'Drama']);

    expect(movies).toEqual(expectedFullSearch);
  })

  it ('It should return a single random movie with no duration and genres', () => {
    const movies = repository.getMoviesByDurationAndGenres(0, []);

    expect(movies.length).toEqual(1);
  });

  it ('It should return a single random movie with no duration and genres', () => {
    const movies = repository.getMoviesByDurationAndGenres(85, []);

    expect(movies).toEqual([{
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      runtime: '92',
      genres: [ 'Comedy', 'Fantasy' ],
      director: '',
      actors: '',
      plot: '',
      posterUrl: ''
      }]);
  });
});
