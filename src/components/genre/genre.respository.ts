import { JsonDB } from "node-json-db";

export class GenreRespository {
  constructor (private db: JsonDB) {}

  getGenres(): string[] {
    return this.db.getData('/genres');
  }
}
