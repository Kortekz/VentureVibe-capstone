

import express from 'express';
import controller from '../controller/cart.js'


const router = express.Router()


router
    .route('/admin')
        .post(controller.postAdmin)
        
router
    .route('/')
        .get(controller.getCarts)
        .delete(controller.deleteCart)

router
    .route('/user')
        .post(controller.addToCart)
        .get(controller.getCart)
        .delete(controller.DeleteFromCart)

router
    .route('/user/:id')
        .delete(controller.DeleteFromCart)

router
    .route('/:id')
        .patch(controller.patchCart)
        .delete(controller.deleteCartById)

export default router