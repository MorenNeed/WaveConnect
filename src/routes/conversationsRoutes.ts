import { Router } from "express";
import ConversationsController from "../controllers/ConversationsController";

const router = Router();

router.post("/", ConversationsController.createConversation);
router.get("/user/:userId", ConversationsController.getConversations);
router.post("/:conversationId/messages", ConversationsController.addMessageToConversation);
router.put("/:conversationId/messages/:messageId", ConversationsController.updateMessageInConversation);
router.delete("/:conversationId/messages/:messageId", ConversationsController.deleteMessageFromConversation);

export default router;