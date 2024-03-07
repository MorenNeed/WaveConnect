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

            console.log(req.files)

            const message = await MessagesService.createMessage(sender, content, files, conversationId);
            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }

    async updateMessage(req: any, res: any, next: any) {
        try {
            const { messageId } = req.params;
            const content = req.body;
            const message = await MessagesService.updateMessage(messageId, content);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    async deleteMessage(req: any, res: any, next: any) {
        try {
            const { messageId } = req.params;
            await MessagesService.deleteMessage(messageId);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

export default new MessagesController();
