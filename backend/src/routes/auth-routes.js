import express from 'express';
import { registerUser } from '../controllers/auth-controllers.js';

// /api/user/auth
const authRoute = new express.Router();

authRoute.post('/', registerUser)

export default authRoute;