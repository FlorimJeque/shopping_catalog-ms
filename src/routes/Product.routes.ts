import { Router } from 'express';

import ProductController from '../controllers/Product.controller';

const routes = Router();

routes.post('/create', ProductController.create);
routes.put('/update/:id', ProductController.update);
routes.put('/list', ProductController.listProducts);

export default routes;
