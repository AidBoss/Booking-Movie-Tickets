import logger from "../../logs/logger";
import districtServices from "../../services/client/district.services";
import { Request, Response } from 'express';

const getAllDistrict = async (req: Request, res: Response): Promise<void> => {
   const result = await districtServices.getAllDistrict();
   if (result.status === 200) {
      res.status(result.status).json({ message: result.message, data: result.data });
   } else {
      res.status(result.status).json({ message: result.message });
   }
}
const getDistrictById = async (req: Request, res: Response): Promise<void> => {
   const id = req.params.id
   const result = await districtServices.getDistrictById(id);
   if (result.status === 200) {
      res.status(result.status).json({ message: result.message, data: result.data })
   } else {
      res.status(result.status).json({ message: result })
   }
}

const searchDistrict = async (req: Request, res: Response): Promise<void> => {
   const { codeName, code, provinceCode } = req.query;

   const searchCriteria: Record<string, any> = {};
   if (codeName) {
      searchCriteria.CodeName = { $regex: codeName, $options: 'i' };
   }

   if (code) {
      searchCriteria.Code = code;
   }

   if (provinceCode) {
      searchCriteria.ProvinceCode = provinceCode
   }

   if (Object.keys(searchCriteria).length === 0) {
      res.status(400).json({ message: 'Bạn cần cung cấp ít nhất một tham số tìm kiếm' });
      return;
   }
   try {
      const result = await districtServices.searchDistrict(searchCriteria);
      res.status(result.status).json({ message: result.message, data: result.data });
   } catch (error: any) {
      logger.error(`Lỗi khi tìm kiếm tỉnh/thành phố: ${error.message}`);
      res.status(500).json({ message: 'Lỗi server' });
   }
};
export default {
   getAllDistrict,
   getDistrictById,
   searchDistrict
}