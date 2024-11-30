import {Request, Response} from 'express';
import userServices from '../../services/admin/user.services'

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUser();
        return res.status(result.status).json({message: result.message, data: result.data});
    } catch (error) {
        return res.status(500).json({message: 'Server Error'});
    }
};

const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await userServices.getUserById(userId);
    res.status(result.status).json({message: result.message, data: result.data});
}

const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const {fullName, email, password, phone, status} = req.body;
    const result = await userServices.editUser(userId, {fullName, email, password, phone, status});
    res.status(result.status).json({message: result.message, data: result.data});
}

const LockUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const status = req.body.status;
    const result = await userServices.LockUser(userId, status);
    res.status(result.status).json({message: result.message});
}

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await userServices.deleteUser(userId);
    res.status(result.status).json({message: result.message});
}

const deleteAll = async (req: Request, res: Response) => {
    const ids = req.body;
    const result = await userServices.deleteAllUser(ids);
    res.status(result.status).json({message: result.message});

}

const fakeUser = async (req: Request, res: Response) => {
    const result = await userServices.fakeUser();
    res.status(result.status).json({message: result.message, data: result.data});
}

export default {
    getAllUsers,
    getUserById,
    updateUser,
    LockUser,
    deleteUser,
    deleteAll,
    fakeUser
};
