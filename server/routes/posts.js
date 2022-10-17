
import express from 'express';
import { createPosts, getPosts } from '../controller/posts.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/', auth, getPosts);


export default router;