// локальный тип
import { Route } from '../types'
// глобальный тип
import { Message } from '../../../shared'

export const verifyAndCreateMessage: Route = (req, res, next) => {
    // извлекаем сообщение из тела запроса
    // утверждение типа, альтернатива as Message
    const message = <Message>req.body
    // если сообщение отсутствует
    if (!message) {
        return res.status(400).json({ message: 'Message must be provided' })
    }
    // если тело сообщения включает слово "know"
    if (message.body.includes('know')) {
        // возвращаем сообщение об ошибке
        return res.status(400).json({ message: 'Nobody knows JavaScript' })
    }
    // создаем и записываем сообщение в res.locals
    res.locals.message = {
        title: 'Message from server',
        body: 'Hello from server!'
    }
    // передаем управление сервису
    next()
}