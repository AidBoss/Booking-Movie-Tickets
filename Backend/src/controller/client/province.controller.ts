import mongoose from "mongoose";
import provinceSerives from "../../services/client/province.serives";
import logger from '../../logs/logger';
import { Request, Response } from 'express';

const getAllProvinces = async (req: Request, res: Response): Promise<void> => {
   const result = await provinceSerives.getAllProvinces();
   res.status(result.status).json({ message: result.message, data: result.data });
}

const getProvinceById = async (req: Request, res: Response): Promise<void> => {
   const id = req.params.id
   const result = await provinceSerives.getProvinceById(id);
   if (result.status === 200) {
      res.status(result.status).json({ message: result.message, data: result.data })
   } else {
      res.status(result.status).json({ message: result })
   }
}

const searchProvinces = async (req: Request, res: Response): Promise<void> => {
   const { codeName, code } = req.query;
   console.log(codeName, code);

   const searchCriteria: Record<string, any> = {};
   if (codeName) {
      searchCriteria.CodeName = { $regex: codeName, $options: 'i' };
   }
   if (code) {
      searchCriteria.Code = code;
   }
   if (Object.keys(searchCriteria).length === 0) {
      res.status(400).json({ message: 'Bạn cần cung cấp ít nhất một tham số tìm kiếm' });
      return;
   }
   try {
      const result = await provinceSerives.searchProvice(searchCriteria);
      res.status(result.status).json({ message: result.message, data: result.data });
   } catch (error: any) {
      logger.error(`Lỗi khi tìm kiếm tỉnh/thành phố: ${error.message}`);
      res.status(500).json({ message: 'Lỗi server' });
   }
}

export default {
   getAllProvinces,
   getProvinceById,
   searchProvinces
}