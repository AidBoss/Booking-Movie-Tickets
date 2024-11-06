import express from "express";
const routerAPI = express.Router();
import loginController from "../controller/auth/login.controller";
import registerController from "../controller/auth/register.controller";
import managerUserController from "../controller/admin/user.controller";
import { authenticateToken, middlewareUser } from "../Middleware/auth.middleware";

// router login, register
routerAPI.post('/login', loginController);

routerAPI.post('/register', registerController);

// router người quản trị

routerAPI.use('/admin', authenticateToken);

routerAPI.get('/admin/user', managerUserController.getAllUsers)

routerAPI.get('/admin/user/:id', managerUserController.getUserById);

routerAPI.put('/admin/user/:id', managerUserController.updateUser)

routerAPI.patch('/admin/user/:id', managerUserController.deleteUser)

routerAPI.get('/admin/categor');

// router người dùng

routerAPI.use('/user', middlewareUser);

routerAPI.get('/user/:id')


export default routerAPI;