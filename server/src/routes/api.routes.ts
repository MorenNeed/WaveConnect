import { Router } from 'express'
// посредник, промежуточный слой
import { verifyAndCreateMessage } from '../middleware/verifyAndCreateMessage.js'
// сервис
import { sendMessage } from '../services/api.services.js'

const router = Router()

router.post('/', verifyAndCreateMessage, sendMessage)

export default router