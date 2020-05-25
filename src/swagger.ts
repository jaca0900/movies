import movieSwagger from './openAPI/movie.controller.swagger';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description: 'Movie api project for a json file db',
    termsOfService: '',
    contact: {
      name: 'Jacek Bednarczyk',
      email: 'jaca09001@gmail.com',
    }
  },
  paths: {
    '/byDuration': {
      get: movieSwagger.getMovies
    },
    '/': {
      post: movieSwagger.addMovie
    }
  }
}