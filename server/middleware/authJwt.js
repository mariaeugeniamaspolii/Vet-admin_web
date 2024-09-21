import jwt from"jsonwebtoken"
import Veterinarian from "../models/Veterinarian.js";

const checkAuth = async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {

        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.veterinarian = await Veterinarian.findById(decoded.id).select(
                "-password -token -verified"
            )
            console.log('decoded: ', decoded);
        } catch (error) {
            const e = new Error("Invalid token")
            return res.status(403).json({ msg: e.message})
        }
    } 

    if(!token) {
        const error = new Error("Token not valid or missing");
        res.status(403).json({ msg: error.message})
    }

    next();
};

export default checkAuth;