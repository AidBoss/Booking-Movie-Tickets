import { Request, Response } from 'express';
import managerUserServices from '../../services/admin/manager-user.services';

const getAllUsers = async (req: Request, res: Response) => {
   const result = await managerUserServices.getAllUser();
   res.status(result.status).json({ message: result.message, data: result.data });
}

const getUserById = async (req: Request, res: Response) => {
   const userId = req.params.id;
   const result = await managerUserServices.getUserById(userId);
   res.status(result.status).json({ message: result.message, user: result.user });
}
export default { getAllUsers, getUserById };
