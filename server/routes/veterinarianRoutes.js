import express from 'express'
import { 
    createVet, 
    profile, 
    confirmation, 
    authVet, 
    resetPassword, 
    checkToken, 
    setNewPassword, 
} from "../controllers/veterinarianController.js"
import checkAuth from '../middleware/authJwt.js';

const router = express.Router();

// * PUBLIC
router.post("/", createVet);
router.get("/profile", checkAuth, profile);
router.get("/confirmation/:token", confirmation);
router.post("/reset-password", resetPassword);
// these two lines are the same as the one below, they use the same route but use different methods and fn
// router.get("/reset-password/:token", checkToken);
// router.post("/reset-password/:token", setNewPassword);
router.route("/reset-password/:token")
    .get(checkToken)
    .post(setNewPassword);


// * PRIVATE
router.post("/login", authVet);

export default router;
