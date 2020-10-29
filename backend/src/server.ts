import express from 'express'
import cors from 'cors';
import routes from './routes';
import { authorization } from './services/auth';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/app/', authorization);

app.use(routes);

app.listen(4000, () => {
  console.log("Server started at port 4000");
});
