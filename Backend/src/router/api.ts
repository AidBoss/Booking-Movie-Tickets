import express from "express";
const routerAPI = express.Router();
import loginController from "../controller/auth/login.controller";
import registerController from "../controller/auth/register.controller";
import managerUserController from "../controller/admin/user.controller";
import { authenticateToken, middlewareUser } from "../Middleware/auth.middleware";
import categoryController from "../controller/admin/category.controller";

// router login, register
routerAPI.post('/login', loginController);

routerAPI.post('/register', registerController);

// router người quản trị

routerAPI.use('/admin', authenticateToken);

routerAPI.get('/admin/user', managerUserController.getAllUsers)

routerAPI.get('/admin/user/:id', managerUserController.getUserById);

routerAPI.put('/admin/user/:id', managerUserController.updateUser)

routerAPI.patch('/admin/user/:id', managerUserController.deleteUser)

// Lấy tất cả danh sách thể loại phim
routerAPI.get('/admin/category', categoryController.getAllCategory);

// Lấy thể loại phim theo id
routerAPI.get('/admin/category/:id', categoryController.getCategoryById);

// Tạo mới 1 thể loại phim
routerAPI.post('/admin/category', categoryController.createCategory);

// Sửa thể loại phim theo id
routerAPI.put('/admin/category/:id', categoryController.updateCategoryById);

// Xóa thể loại phim theo id
routerAPI.delete('/admin/category/:id', categoryController.deleteCategoryById);

// router người dùng

routerAPI.use('/user', middlewareUser);

routerAPI.get('/user/:id')


export default routerAPI;