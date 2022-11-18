import express from 'express';
import valid from '../../utilities/validator';

const imgRoute = express.Router();

imgRoute.get('/', valid.validator, (req, res) => {
  res.send(res.locals.output);
});

export default imgRoute;
