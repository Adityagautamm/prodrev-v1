import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

import authRoutes from './routes/auth.js';
import refreshRoutes from './routes/refresh.js';
import logoutRoutes from './routes/logout.js';

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(credentials);

app.use(cors({ origin: true, credentials: true, }));
// Cross Origin Resource Sharing
//app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/user', userRoutes);



// app.use('/posts', postRoutes);
// app.use('/auth', authRoutes);
// app.use('/refresh', refreshRoutes);
// app.use('/logout', logoutRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

