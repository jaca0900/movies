const movieSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    title: {
      type: 'string'
    },
    year: {
      type: 'integer'
    },
    runtime: {
      type: 'integer'
    },
    genres: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    director: {
      type: 'string'
    },
    actors: {
      type: 'string'
    },
    plot: {
      type: 'string'
    },
    posterUrl: {
      type: 'string'
    }
  }
}
const errorSchema = {
  type: 'object',
  properties: {
    field: {
      type: 'string',
      description: 'Field name that the error occured on',
    },
    message: {
      type: 'string',
      description: 'Error information'
    }
  }
}

export default {
  getMovies: {
    tags: ['movies'],
    description: 'Get movies by duration and optionally pass genre query array',
    parameters: [
      {
        in: 'path',
        name: 'duration',
        description: 'Movie duration'
      },
      {
        in: 'query',
        name: 'genres',
        description: 'Array of optional genres to filter the response'
      }
    ],
    security: [],
    responses: {
      "200": {
        description: 'A list of movies ranging from many to 1 single when genres are not passed or duration is 0',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: movieSchema
            }
          }
        }
      },
      "400": {
        description: 'This error is returned when passed genres is not an Array or duration cannot be cast to number'
      }
    }
  },
  addMovie: {
    tags: ['movies'],
    description: 'Adds new movie to the database',
    security: [],
    requestBody: {
      content: {
        'application/json': {
          schema: movieSchema
        }
      }
    },
    responses: {
      "200": {
        description: 'The just created movie',
        content: {
          'application/json': {
            schema: movieSchema
          }
        }
      },
      "400": {
        description: 'Array of prepared errors',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: errorSchema
            }
          }
        }
      }
    }
  }
}