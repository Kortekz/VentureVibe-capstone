import express from 'express'
import auth from '../controller/auth.js'

const router = express.Router()

router
    .route('/')
        .post(auth.addUser)

export default router