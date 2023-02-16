import express from 'express'
const router = express.Router()
import { getAllPosts, getPostById, deletePostById, createNewPost,updatePostMessageById } from '../controllers/post'
import authenticate from '../common/auth_middleware'


router.get('/',getAllPosts)

router.post('/',authenticate,createNewPost)

router.get('/:id',authenticate,getPostById)

router.delete('/:id',authenticate,deletePostById)
//router.delete('/',authenticate,deletePostById)


router.post('/updateMessage/',authenticate,updatePostMessageById)

export = router
