import 'jest';
import { MovieRepository } from './movie.repository';
import { JsonDB } from 'node-json-db';

const mockMovies = [
  {
    "id": 1,
    "title": "Beetlejuice",
    "year": 1988,
    "runtime": 92,
    "genres": [
      "Comedy",
      "Fantasy"
    ],
    "director": "",
    "actors": "",
    "plot": "",
    "posterUrl": ""
  },
  {
    "id": 2,
    "title": "The Cotton Club",
    "year": 1984,
    "runtime": 127,
    "genres": [
      "Crime",
      "Drama",
      "Music"
    ],
    "director": "",
    "actors": "",
    "plot": "",
    "posterUrl": ""
  },
  {
    "id": 3,
    "title": "The Shawshank Redemption",
    "year": 1994,
    "runtime": 130,
    "genres": [
      "Crime",
      "Drama"
    ],
    "director": "",
    "actors": "",
    "plot": "",
    "posterUrl": ""
  },
  {
    "id": 4,
    "title": "Chicago",
    "year": 2002,
    "runtime": 117,
    "genres": [
      "Crime",
      "Music"
    ],
    "director": "",
    "actors": "",
    "plot": "",
    "posterUrl": ""
  },
]

const expectedFullSearch = [
  {
    "id": 2,
    "title": "The Cotton Club",
    "year": 1984,
    "runtime": 127,
    "genres": [
      "Crime",
      "Drama",
      "Music"
    ],
    "director": "",
    "actors": "",
    "plot": "",
    "posterUrl": ""
  },
  {
    "id": 3,
    "title": "The Shawshank Redemption",
    "year": 1994,
    "runtime": 130,
    "genres": [
      "Crime",
      "Drama"
    ],
    "director": "",
    "actors": "",
    "plot": "",
    "posterUrl": ""
  },
  {
    "id": 4,
    "title": "Chicago",
    "year": 2002,
    "runtime": 117,
    "genres": [
      "Crime",
      "Music"
    ],
    "director": "",
    "actors": "",
    "plot": "",
    "posterUrl": ""
  },
]

const repository = new MovieRepository({} as JsonDB);

repository.readMovies = jest.fn();
// @ts-ignore
repository.readMovies.mockReturnValue(mockMovies);

export default {repository, expectedFullSearch};