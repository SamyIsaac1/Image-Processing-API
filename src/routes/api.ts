import express from 'express';
import imgRoute from './api/img';

const apiRoute = express.Router();

apiRoute.use('/images', imgRoute);

apiRoute.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Image Processing API');
});

export default apiRoute;
