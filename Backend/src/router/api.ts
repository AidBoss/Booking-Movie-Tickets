import express from "express";
const routerAPI = express.Router();

// router login
routerAPI.post('/login');
// router register
routerAPI.post('/register');
export default routerAPI;