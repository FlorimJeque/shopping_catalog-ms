import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import routes from './routes/routes';
import categoryRoutes from './routes/Category.routes';
import productRoutes from './routes/Product.routes';
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', routes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);

export default app;
