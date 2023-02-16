import express from 'express'
const router = express.Router()
import {findUserByEmail , editUser ,findUserById} from "../controllers/user"
import authenticate from '../common/auth_middleware'

//router.get('/:email',findUserByEmail)
router.post('/edit',authenticate,editUser)
router.get('/:_id',findUserById)


export = router