import express from 'express';
import { Router } from './components/router';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
const app = express();
const db: JsonDB = new JsonDB(new Config(`data/db.json`, true, true, '/'))

app.listen(3000, () => {
  console.log('Listening on port 3000');
  Router.registerRoutes(app, db);
  console.log('Registered');
})
