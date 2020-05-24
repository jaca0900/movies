import { Application, Router, Request, Response } from 'express';

export class MovieController {
  router: Router;

  constructor(app: Application) {
    this.router = Router();

    app.use('/movies', this.router);
  }

  registerRoutes() {
    this.router.get('/',
      (req: Request, res: Response) => {
        res.status(200).send('It lives');
      });
  }
}