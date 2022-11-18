import express from 'express';
import apiRoute from './routes/api';

// Creating express object
const app = express();
// Defining port number
const port = 3000;

// https://expressjs.com/en/starter/static-files.html
// Function to serve all static Images
app.use('/images', express.static('assets'));

// Route to api
app.use('/api', apiRoute);

// Home page
app.get('/', (req: express.Request, res: express.Response): void => {
  const start: String =
    '<h1>Starting...</h1><h2 style="color:green;">please redirect to "/api/images"</h2>';
  res.send(start);
});

// Server setup
app.listen(port, () => {
  console.log(`Running server on port ${port}...`);
});

export default app;
