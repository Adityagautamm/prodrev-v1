
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from '../models/userModel.js'

const options = {
    maxAge: process.env.AUTH_SECRET_TOKEN_LIFE * 1000, // AUTH_SECRET_TOKEN_LIFE is in seconds, convert seconds to ms
    httpOnly: true,
    path: '/',
    secure: (process.env.NODE_LOCAL_ENV && process.env.NODE_LOCAL_ENV === 'local') ? false : true, // NOTE: while development on local, we need to pass secure:false and for any other env, it should be true
    domain: (process.env.NODE_LOCAL_ENV && process.env.NODE_LOCAL_ENV === 'local') ? 'localhost' : (process.env.AUTH_COOKIE_DOMAIN), // domain name should be same, we can also use sub domain which is set in config
};

export const signin = async (req, res) => {

    const { email, password } = req.body;
    console.log('at user controller signin method' + JSON.stringify(req.body));
    try {
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: 'no such user exists' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })

        // create JWTs
        const accessToken = jwt.sign({ name: existingUser.name, email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "10s" })

        const refreshToken = jwt.sign({ email: existingUser.email, time: Date.now() }, 'test_refreshToken',)

        //storing the new refreesh Token   
        userModel.findOneAndUpdate({ email: email }, { $set: { refreshToken: refreshToken } }, { new: false }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }

            console.log(doc);
        });

        // once deployed make sure cookie is secure: true
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ name: existingUser.name, accessToken, message: 'Login successfully' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong--" + error });
    }

}

export const signup = async (req, res) => {
    console.log('signup controller');

    const { firstName, lastName, email, password, confirmPassword, } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        if (password !== confirmPassword) return res.status(401).json({ message: 'password doesnt match' });

        const hashedPassword = await bcrypt.hash(password, 12);


        const refreshToken = jwt.sign({ name: firstName + "" + lastName, email: email, time: Date.now() }, 'test_refreshToken',)

        // Saving refreshToken with current user
        const result = await userModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, refreshToken: refreshToken });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "10s" });


        //        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

        res.status(200).json({ name: result.name, token, message: 'Registered successfully' });
    } catch (error) {
        res.status(500).json({ message: "Something went wronggggggggggggg" + error });
        console.error(error.response.data);
    }


}