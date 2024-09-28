import express from "express";
const routerAPI = express.Router();
import loginController from "../controller/auth/login.controller";
import registerController from "../controller/auth/register.controller";
// router login
routerAPI.post('/login', loginController);
// router register
routerAPI.post('/register', registerController);

export default routerAPI;