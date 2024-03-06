

import express from 'express';
import controller from '../controller/users.js'
const router = express.Router()


router
    .route('/')
        .get(controller.getMany)
        .post(controller.postMany)

router
    .route('/:id')
        .get(controller.getID)
        .patch(controller.patchID)
        .delete(controller.deleteID)


router
    .route('/:name')

// module.exports = router (common JS)

export default router