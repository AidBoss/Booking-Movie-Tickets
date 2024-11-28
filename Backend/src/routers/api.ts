import express from "express";
import authController from "../controller/auth/auth.controller";
import refreshTokenController from "../controller/auth/refreshToken.controller";
import { authenticateToken } from "../Middleware/auth.middleware";
import userController from "../controller/admin/user.controller";
import categoryController from "../controller/admin/category.controller";
import movieController from "../controller/admin/movie.controller";
import provinceController from "../controller/client/province.controller";
import districtController from "../controller/client/district.controller";
import wardController from "../controller/client/ward.controller";
const routerAPI = express.Router();


routerAPI.post('/login', authController.loginController)

routerAPI.post('/register', authController.registerController)

routerAPI.post('/refresh-token', refreshTokenController)

// router admin 
// ------------- user -----------------
routerAPI.get('/admin', authenticateToken)

routerAPI.put('/admin/user/:id', userController.updateUser)

routerAPI.delete('/admin/user/:id', userController.deleteUser)

// ------------- category ------------

routerAPI.post('/admin/category', categoryController.createCategory)

routerAPI.put('/admin/category/:id', categoryController.updateCategoryById)

routerAPI.delete('/admin/category/:id', categoryController.deleteCategoryById)

routerAPI.delete('/admin/category/:id', categoryController.deleteCategoryAll)

// ------------- movie ------------

routerAPI.post('/admin/movie', movieController.createMovie)

routerAPI.put('/admin/movie/:id', movieController.updateMovie)

routerAPI.delete('/admin/movie/:id', movieController.deleteMovieById)

routerAPI.delete('/admin/movie/:ids', movieController.deleteMovieAll)










// router user
// -------------users ------------
routerAPI.get('/user', userController.getAllUsers)

routerAPI.get('/user/:id', userController.getUserById)

// ------------category ------------
routerAPI.get('/category', categoryController.getAllCategory)

routerAPI.get('/category/:id', categoryController.getCategoryById)

// ------------- movie ------------
routerAPI.get('/movie', movieController.getAllMovie)

routerAPI.get('/movie/:id', movieController.getMovieById)

// router address province

routerAPI.get('/address/p', provinceController.getAllProvinces)

routerAPI.get('/address/p/search', provinceController.searchProvinces)

routerAPI.get('/address/p/:id', provinceController.getProvinceById)

// router address district

routerAPI.get('/address/d', districtController.getAllDistrict)

routerAPI.get('/address/d/search', districtController.searchDistrict)

routerAPI.get('/address/d/:id', districtController.getDistrictById)

// router address ward

routerAPI.get('/address/w', wardController.getAllWard)

routerAPI.get('/address/w/search', wardController.searchWard)

routerAPI.get('/address/w/:id', wardController.getWardById)

export default routerAPI;