import { Request, Response } from 'express';
import prisma from '../services/prima';
import http from '../utils/http';
import RabbitMQ from '../services/rabbitmq';
import QUEUES from '../config/constants';

class ProductController {
  async create(req: Request, res: Response) {
    try {
      console.log(req.body);

      const { name, price, id } = await prisma.product.create({ data: req.body });
      await new RabbitMQ().publish(QUEUES.PRODUCT_CREATED, JSON.stringify({ product: { name, price, id } }));
      http.sendResponse(res, 201, { message: 'Product created' });
    } catch (error) {
      console.log(error);
      http.sendResponse(res, 500, { error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, price, id } = await prisma.product.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      await new RabbitMQ().publish(QUEUES.PRODUCT_UPDATED, JSON.stringify({ product: { name, price, id } }));
      http.sendResponse(res, 201, { message: 'Product updated' });
    } catch (error) {
      console.log(error);
      http.sendResponse(res, 500, { error });
    }
  }

  async listProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();
      http.sendResponse(res, 201, { message: 'Products retrieved', products });
    } catch (error) {
      http.sendResponse(res, 500, { error });
    }
  }
}

export default new ProductController();
