import jwt from "jsonwebtoken";
const secret = "test";

const auth = async (req, res, next) => {
    console.log("Middleware");
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) return res.sendStatus(403); //invalid token
                //  req.userId = decodedData?.name;
            });

            // decodedData = jwt.verify(token, secret);

            //req.userId = decodedData?.id;
        } else {
            console.log("DECODE");
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
