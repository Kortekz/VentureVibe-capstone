import express from 'express';
import controller from '../controller/users.js'
const router = express.Router()


router
    .route('/')
        .post(controller.addUser)


export default router