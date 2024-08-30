import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    // Read the token 
    const token = req.headers['authorization'];

    // if token not found, return the error 
    if(!token) {
        return res.status(401).send('Authorization not found');
    }

    // check if token is valid or not 
    try {
        const payload = jwt.verify(
            token,
            "lUKFY4YuLhw9SHxCVoNSZrdtbZ52tPCX"
        );
        req.userId = payload.userId;
        // console.log("Payload :: ", payload);
    } catch (error) {
        // 4. return error 
        return res.status(401).send("UnAuthorized");
    }

    // 5. call next middleware 
    next();
}

export default jwtAuth;