import { Request, Response } from 'express';
import managerUserServices from '../../services/admin/manager-user.services';
const getAllUsers = async (req: Request, res: Response) => {
   try {
      const result = await managerUserServices.getAllUser();
      return res.status(result.status).json({ message: result.message, data: result.data });
   } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
   }
};

const getUserById = async (req: Request, res: Response) => {
   const userId = req.params.id;
   const result = await managerUserServices.getUserById(userId);
   res.status(result.status).json({ message: result.message, data: result.data });
}

const updateUser = async (req: Request, res: Response) => {
   const userId = req.params.id;
   const { fullname, email, phone, address, role, status } = req.body;
   const result = await managerUserServices.editUser(userId, { fullname, email, phone, address, role, status });
   res.status(result.status).json({ message: result.message, data: result.data });
}

const LockUser = async (req: Request, res: Response) => {
   const userId = req.params.id;
   const status = req.body.status;
   const result = await managerUserServices.LockUser(userId, status);
   res.status(result.status).json({ message: result.message });
}

const deleteUser = async (req: Request, res: Response) => {
   const userId = req.params.id;
   const result = await managerUserServices.deleteUser(userId);
   res.status(result.status).json({ message: result.message });
}

export default { getAllUsers, getUserById, updateUser, LockUser, deleteUser };
