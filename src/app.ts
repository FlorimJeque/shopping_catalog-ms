import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import indexC from './controllers/index';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', indexC.index);

export default app;
