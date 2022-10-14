
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from '../models/userModel.js'


export const tokenVerify = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(402)
    const existingUser = await userModel.findOne({ refreshToken })
    if (!existingUser) return res.sendStatus(403)
    jwt.verify(refreshToken, 'test_refreshToken', (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: existingUser.email })
        res.json({ accessToken: accessToken })
    })
}


function generateAccessToken(user) {
    return jwt.sign(user, 'test', { expiresIn: '15s' })
}

