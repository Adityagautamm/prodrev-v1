
import express from 'express';
import { tokenVerify } from '../controller/auth.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.post('/token', tokenVerify);

export default router;