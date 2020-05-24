import express from 'express';
import { Router } from './components/router';
const app = express();

app.listen(3000, () => {
  console.log('Listening on port 3000');
})

Router.registerRoutes(app);
console.log('Registered');