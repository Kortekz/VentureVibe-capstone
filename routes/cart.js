

import express from 'express';
import controller from '../controller/cart.js'


const router = express.Router()


router
    .route('/admin')
        .post(controller.postAdmin)
        
router
    .route('/')
        .post(controller.getCarts)
        .delete(controller.deleteCart)

router
    .route('/user')
        .post(controller.addToCart)
        .delete(controller.DeleteFromCart)
router
    .route('/user/cart')
        .post(controller.getCart)

router
    .route('/user/:id')
        .delete(controller.DeleteFromCart)

router
    .route('/:id')
        .patch(controller.patchCart)
        .delete(controller.deleteCartById)

export default router