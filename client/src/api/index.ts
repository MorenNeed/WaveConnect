import { SERVER_URI } from '../config'
import { Message } from '../../../shared'

const commonOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const sendWrongMessage = async () => {
    const options = {
        ...commonOptions,
        body: JSON.stringify({
            title: 'Message from client',
            body: 'I know JavaScript'
        })
    }

    try {
        const response = await fetch(SERVER_URI, options)
        if (!response.ok) throw response
        const data = await response.json()
        if (data?.message) {
            return data.message as Message
        }
    } catch (e: unknown) {
        if ((e as Response).status === 400) {
            const data = await (e as Response).json()
            throw data
        }
        throw e
    }
}

const sendRightMessage = async () => {
    const options = {
        ...commonOptions,
        body: JSON.stringify({
            title: 'Message from client',
            body: 'Hello from client!'
        })
    }

    const response = await fetch(SERVER_URI, options)
    if (!response.ok) throw response
    const data = await response.json()
    if (data?.message) {
        return data.message as Message
    }
}

export default { sendWrongMessage, sendRightMessage }