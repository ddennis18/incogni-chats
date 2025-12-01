import express from 'express';
import { registerUser } from '../controllers/auth-controllers.js';

const authRoute = new express.Router();

authRoute.post('/', registerUser)

export default authRoute;