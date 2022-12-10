
import jwt from "jsonwebtoken";

import userModel from '../models/userModel.js'


export const handleRefreshToken = async (req, res) => {

    console.log('refresh token API');
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await userModel.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(401);
            if (foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.email },
                'test',
                { expiresIn: '10s' }
            );
            console.log('Access token');
            res.json({ accessToken })
        }
    );
}

