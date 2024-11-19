import { Request, Response } from 'express';
import { refreshTokenService } from '../../services/auth/refreshToken.services';

const refreshTokenController = async (req: Request, res: Response): Promise<void> => {
   try {
      const { refreshToken } = req.body;

      const result = await refreshTokenService(refreshToken);

      if (result.status === 200) {
         res.status(result.status).json({ message: result.message, accessToken: result.accessToken });
      } else {
         res.status(result.status).json({ message: result.message });
      }
   } catch (error: any) {
      res.status(500).json({ message: 'Có lỗi trong quá trình làm mới token', error: error.message });
   }
};

export default refreshTokenController;
