import { Request, Response } from "express";
import mongoose from "mongoose";
import categoryServices from "../../services/admin/category.services";
import { ICategoryCreate } from "../../interfaces/category.interface";

const getAllCategory = async (req: Request, res: Response): Promise<void> => {
   const result = await categoryServices.getAllCategory();

   res.status(result.status).json({ message: result.message, data: result.data });
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
   const categoryId = req.params.id;
   if (!mongoose.isValidObjectId(categoryId)) {
      res.status(400).json({ message: "ID không hợp lệ" });
      return;
   }
   const result = await categoryServices.getCategoryById(categoryId);
   res.status(result.status).json({ message: result.message, data: result.data });
};

const createCategory = async (req: Request, res: Response): Promise<void> => {
   const { name, description }: ICategoryCreate = req.body;
   const result = await categoryServices.createCategory({ name, description });
   res.status(result.status).json({ message: result.message, data: result.data });
};

const updateCategoryById = async (req: Request, res: Response): Promise<void> => {
   const categoryId = req.params.id;
   if (!mongoose.isValidObjectId(categoryId)) {
      res.status(400).json({ message: "ID không hợp lệ" });
      return;
   }
   const { name, description }: ICategoryCreate = req.body;
   const result = await categoryServices.updateCategory(categoryId, { name, description });
   res.status(result.status).json({ message: result.message, data: result.data });
};

const deleteCategoryById = async (req: Request, res: Response): Promise<void> => {
   const categoryId = req.params.id;
   if (!mongoose.isValidObjectId(categoryId)) {
      res.status(400).json({ message: "ID không hợp lệ" });
      return;
   }
   const result = await categoryServices.deleteCategoryById(categoryId);
   res.status(result.status).json({ message: result.message });
};

export default {
   getAllCategory,
   getCategoryById,
   createCategory,
   updateCategoryById,
   deleteCategoryById
};
