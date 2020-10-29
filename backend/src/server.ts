import express from 'express'
import 'express-async-errors';
import cors from 'cors';

import './database/connection';

import routes from './routes';
import { authorization } from './services/auth';
import errorHandler from './errors/handler';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/app/', authorization);

app.use(routes);
app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server started at port 4000");
});
