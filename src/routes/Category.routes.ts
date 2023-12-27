import { Router } from 'express';

import CategoryController from '../controllers/Category.controller';

const routes = Router();

routes.post('/create', CategoryController.create);
routes.post('/update/:id', CategoryController.update);
routes.get('/list', CategoryController.listCategories);

export default routes;
