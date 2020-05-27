import {MovieController} from './movie.controller';
import Mock from './movie.repository.spec.mock';
import genreRepository from '../genre/genre.repository.spec.mock';
import { Application } from 'express';

describe ('Movie Controller validation', () => {
  let controller: MovieController;

  beforeAll(() => {
    controller = new MovieController({use: ()=> {}} as Application, Mock.repository, genreRepository);
  })

  it('Should return genre list error', () => {
    const errors = controller.validateMovie({
      id: 1,
      title: 'Beetlejuice',
      year: 1988,
      runtime: 92,
      genres: [ 'Comedy', 'Fantasy' ],
      director: 'Tim Burton',
      actors: '',
      plot: '',
      posterUrl: ''
    });

    expect(errors).toEqual([
      {
        field: 'genre',
        message: 'Genre Fantasy is not present in: [ Comedy, Music, Crime ]'
      }
    ])
  })

  it('Should return title list error', () => {
    const errors = controller.validateMovie({
      id: 1,
      title: '',
      year: 1988,
      runtime: 92,
      genres: [ 'Comedy' ],
      director: 'Tim Burton',
      actors: '',
      plot: '',
      posterUrl: ''
    });

    expect(errors).toEqual([
      {
        field: 'title',
        message: 'Movie title is required and cannot be longer then 255 characters'
      }
    ]);
  })

  it('Should return year list error', () => {
    const errors = controller.validateMovie({
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      runtime: 92,
      genres: [ 'Comedy' ],
      director: 'Tim Burton',
      actors: '',
      plot: '',
      posterUrl: ''
    });

    expect(errors).toEqual([
      {
        field: 'year',
        message: 'Movie year is required and must be a finite number'
      }
    ]);
  })

  it('Should return runtime list error', () => {
    const errors = controller.validateMovie({
      id: 1,
      title: 'Beetlejuice',
      year: 1988,
      runtime: '92',
      genres: [ 'Comedy' ],
      director: 'Tim Burton',
      actors: '',
      plot: '',
      posterUrl: ''
    });

    expect(errors).toEqual([
      {
        field: 'runtime',
        message: 'Movie runtime is required and must be a finite number'
      }
    ]);
  })

  it('Should return director list error', () => {
    const errors = controller.validateMovie({
      id: 1,
      title: 'Beetlejuice',
      year: 1988,
      runtime: 92,
      genres: [ 'Comedy' ],
      director: '',
      actors: '',
      plot: '',
      posterUrl: ''
    });

    expect(errors).toEqual([
      {
        field: 'director',
        message: 'Movie director is required and cannot be longer then 255 characters',
      }
    ]);
  })

  it ('Should return multiple errors', () => {
    const errors = controller.validateMovie({
      id: 1,
      title: '',
      year: '1988',
      runtime: '92',
      genres: [ 'Comedy', 'Fantasy' ],
      director: '',
      actors: '',
      plot: '',
      posterUrl: ''
    });

    expect(errors).toEqual([
      {
        field: 'genre',
        message: 'Genre Fantasy is not present in: [ Comedy, Music, Crime ]'
      },
      {
        field: 'title',
        message: 'Movie title is required and cannot be longer then 255 characters'
      },
      {
        field: 'year',
        message: 'Movie year is required and must be a finite number'
      },
      {
        field: 'runtime',
        message: 'Movie runtime is required and must be a finite number'
      },
      {
        field: 'director',
        message: 'Movie director is required and cannot be longer then 255 characters'
      }
    ]);
  })
})