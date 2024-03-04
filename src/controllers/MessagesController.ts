import { Request, Response, NextFunction } from "express";
import MessagesService from "../services/MessagesService";
import { Content } from "../models/Content";

class MessagesController {
    async createMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { sender, content, conversationId } = req.body;
            const message = await MessagesService.createMessage(sender, content as Content, conversationId);
            res.json(message);
        } catch (error) {
            next(error);
        }
    }
}

export default new MessagesController();