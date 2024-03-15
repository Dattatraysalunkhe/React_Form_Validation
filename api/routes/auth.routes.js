import { Router } from "express";
import { signup, signin,updateUser, signout } from "../controller/auth.controller.js";
import { VerifyUser } from "../middleware/VerifyUser.middleware.js";


const router = Router()

router.route("/signup").post(signup)
router.route('/signin').post(signin)
router.route('/update/:id').post(VerifyUser,updateUser)
router.route('/signout').get(signout)



export default router