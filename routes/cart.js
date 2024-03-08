

import express from 'express';
import controller from '../controller/cart.js'


const router = express.Router()


router
    .route('/')
        .post(controller.addToCart)


// module.exports = router (common JS)

export default router