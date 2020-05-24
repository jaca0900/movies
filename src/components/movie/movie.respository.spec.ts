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
    console.log(movies);

    expect(movies).toEqual(expectedFullSearch)
  })

  it('It should return a single random movie', () => {
    console.log(repository.getMoviesByDurationAndGenres(0, []));
  })
});
