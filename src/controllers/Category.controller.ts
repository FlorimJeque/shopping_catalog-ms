import { Request, Response } from 'express';
import prisma from '../services/prima';
import http from '../utils/http';

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      await prisma.category.create({ data: req.body });
      http.sendResponse(res, 201, { message: 'Category created' });
    } catch (error) {
      console.log(error);
      http.sendResponse(res, 500, { error });
    }
  }
  async update(req: Request, res: Response) {
    try {
      await prisma.category.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      http.sendResponse(res, 201, { message: 'Category updated' });
    } catch (error) {
      http.sendResponse(res, 500, { error });
    }
  }

  async listCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();
      http.sendResponse(res, 201, { message: 'Catagory retrieved retrieved', categories });
    } catch (error) {
      http.sendResponse(res, 500, { error });
    }
  }
}

export default new CategoryController();
