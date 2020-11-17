import express from 'express';
import * as bodyParser from "body-parser";
import dotenv from 'dotenv';
import './config/connection';
import swagger from './swagger/controllers/swagger';
import auth from './routes/auth';
import notes from './routes/notes';

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// allow cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
  );
  next();
});

app.use('/api/docs', swagger.router);
app.use('/auth', auth);
app.use('/notes', notes);

app.get('/', (req, res) => {
  res.send('Hey there!!!');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on ${port}`);
});

export default app;