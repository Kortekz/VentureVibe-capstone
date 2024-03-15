import express from 'express'
import controller from '../controller/users.js'
import { authenticateUser } from '../middleware/authenticate.js'

const router = express.Router()

router
    .route('/')
        .post(controller.loginUser)

export default router