import express from 'express';

import {  getMyprofile, login, logout, register } from '../controlers/funct.js';
import { isAuthenticated } from '../middlewares/authentication.js';
const router = express.Router();


router.get("/users/all",isAuthenticated,getMyprofile)

router.post("/users/new",register)

router.post("/users/login",login)

router.get('/users/logout',logout)



export default router