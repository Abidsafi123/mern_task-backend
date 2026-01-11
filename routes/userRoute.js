import express from "express"

const router  = express.Router()

import{registerUser,loginUser,currentUser}  from "../controllers/userController.js"
import protect from "../middleware/authMiddleware.js"

// creating user routes

// register route

router.post('/',registerUser)
//login route

router.post('/login',loginUser)

// get current user

router.get('/current',protect,currentUser)



export default router;