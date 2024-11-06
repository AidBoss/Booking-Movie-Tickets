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

const updateUser = async (req: Request, res: Response) => {
   const userId = req.params.id;
   const { fullname, email, phone, address, role, status } = req.body;
   const result = await managerUserServices.editUser(userId, { fullname, email, phone, address, role, status });
   res.status(result.status).json({ message: result.message, user: result.user });
}

const deleteUser = async (req: Request, res: Response) => {
   const userId = req.params.id;
   const deleted = req.body.deleted;
   const result = await managerUserServices.deleteUser(userId, deleted);
   res.status(result.status).json({ message: result.message });
}
export default { getAllUsers, getUserById, updateUser, deleteUser };
