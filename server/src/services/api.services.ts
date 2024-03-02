// локальный тип
import { Route } from '../types'

export const sendMessage: Route = (req, res, next) => {
    try {
        // извлекаем сообщение из res.locals
        const { message } = res.locals
        if (message) {
            res.status(200).json({ message })
        } else {
            res
                .status(404)
                .json({ message: 'There is no message for you, my friend' })
        }
    } catch (e) {
        next(e)
    }
}