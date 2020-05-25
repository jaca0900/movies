import { JsonDB } from 'node-json-db';
import { GenreRespository } from './genre.respository';

const mockedGenres = [
  'Comedy',
  'Music',
  'Crime'
];

const genreRepository = new GenreRespository({} as JsonDB);

genreRepository.getGenres = jest.fn();
// @ts-ignore
genreRepository.getGenres.mockReturnValue(mockedGenres);

export default genreRepository;