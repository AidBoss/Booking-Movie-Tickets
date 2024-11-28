import mongoose from "mongoose";
import logger from "../../logs/logger";
import { Request, Response } from 'express';
import wardServices from "../../services/client/ward.services";

const getAllWard = async (req: Request, res: Response): Promise<void> => {
   const result = await wardServices.getAllWard();
   if (result.status === 200) {
      res.status(result.status).json({ message: result.message, data: result.data });
   } else {
      res.status(result.status).json({ message: result.message });
   }
}
const getWardById = async (req: Request, res: Response): Promise<void> => {
   const id = req.params.id
   const result = await wardServices.getWardById(id);
   if (result.status === 200) {
      res.status(result.status).json({ message: result.message, data: result.data })
   } else {
      res.status(result.status).json({ message: result })
   }
}

const searchWard = async (req: Request, res: Response): Promise<void> => {
   const { codeName, code, districtCode } = req.query;

   const searchCriteria: Record<string, any> = {};
   if (codeName) {
      searchCriteria.CodeName = { $regex: codeName, $options: 'i' };
   }

   if (code) {
      searchCriteria.Code = code;
   }

   if (districtCode) {
      searchCriteria.DistrictCode = districtCode
   }

   if (Object.keys(searchCriteria).length === 0) {
      res.status(400).json({ message: 'Bạn cần cung cấp ít nhất một tham số tìm kiếm' });
      return;
   }
   try {
      const result = await wardServices.searchWard(searchCriteria);
      res.status(result.status).json({ message: result.message, data: result.data });
   } catch (error: any) {
      logger.error(`Lỗi khi tìm kiếm tỉnh/thành phố: ${error.message}`);
      res.status(500).json({ message: 'Lỗi server' });
   }
};
export default {
   getAllWard,
   getWardById,
   searchWard
}