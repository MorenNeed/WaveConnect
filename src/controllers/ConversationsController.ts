import { Request, Response, NextFunction } from "express";
import ConversationsService from "../services/ConversationsService";

class ConversationsController {
    async createConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, recipientId } = req.body;
            const conversation = await ConversationsService.createConversationByUsersId(userId, recipientId);
            res.json(conversation);
        } catch (error) {
            next(error);
        }
    }

    async getConversations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.userId;
            const conversations = await ConversationsService.getConversationsByUserId(userId);
            res.json(conversations);
        } catch (error) {
            next(error);
        }
    }

    async addMessageToConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const conversationId = req.params.conversationId;
            const message = req.body;
            const conversation = await ConversationsService.addMessageToConversation(conversationId, message);
            res.json(conversation);
        } catch (error) {
            next(error);
        }
    }

    async updateMessageInConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { conversationId, messageId } = req.params;
            const message = req.body;
            const conversation = await ConversationsService.updateMessageInConversation(conversationId, messageId, message);
            res.json(conversation);
        } catch (error) {
            next(error);
        }
    }

    async deleteMessageFromConversation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { conversationId, messageId } = req.params;
            await ConversationsService.deleteMessageFromConversation(conversationId, messageId);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

export default new ConversationsController();