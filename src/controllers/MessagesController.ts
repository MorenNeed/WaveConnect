import MessagesService from "../services/MessagesService";
import { Content } from "../models/Content";
import { Message } from "../models/Message";

class MessagesController {
    async createMessage(req: any, res: any, next: any) {
        try {
            const { sender, conversationId } = req.fields;
            const text = req.fields.text || "";
            const files = req.files.files || [];
            const content: Content = { text, attachements: [] };

            const message = await MessagesService.createMessage(sender, content, files, conversationId);
            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }
}

export default new MessagesController();
