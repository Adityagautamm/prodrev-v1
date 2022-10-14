import express from 'express';

import { handleRefreshToken } from '../controller/refreshToken.js';
const router = express.Router();
router.get('/', handleRefreshToken);

export default router;