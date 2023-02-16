import express from 'express'
const router = express.Router()
import {getAllMessages,createNewMessage} from "../controllers/message"

router.get("/",getAllMessages)
router.post("/",createNewMessage)

export = router