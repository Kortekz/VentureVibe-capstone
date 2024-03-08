

import express from 'express';
import controller from '../controller/cart.js'


const router = express.Router()


router
    .route('/')
        .post(controller.addToCart)
        .get(controller.getCart)
        .delete(controller.deleteFromCart)

export default router