import jwt from "jsonwebtoken";
const secret = "test";

const authMiddleware = async (req, res, next) => {
    console.log("Middleware");
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;


        if (token && isCustomAuth) {
            console.log('IF block')
            decodedData = jwt.verify(token, secret);

            req.userId = decodedData?.id;
        } else {
            console.log('else block')
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log('error:' + error);
    }
};


export default authMiddleware;
