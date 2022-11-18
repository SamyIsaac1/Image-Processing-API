import express from 'express';
import valid from '../../utilities/validator';

const imgRoute = express.Router();

imgRoute.get(
  '/',
  valid.validator,
  (req: express.Request, res: express.Response): void => {
    res.send(res.locals.output);
  }
);

export default imgRoute;
