import express from "express";
const routerAPI = express.Router();
import loginController from "../controller/auth/login.controller";
import registerController from "../controller/auth/register.controller";
import managerUserController from "../controller/admin/manager-user.controller";
import { authenticateToken } from "../Middleware/auth.middleware";

// router login
routerAPI.post('/login', loginController);

routerAPI.post('/register', registerController);

routerAPI.use('/admin', authenticateToken);

routerAPI.get('/admin/user', managerUserController.getAllUsers)

routerAPI.get('/admin/user/:id', managerUserController.getUserById);

export default routerAPI;