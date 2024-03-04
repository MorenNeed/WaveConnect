import { Router } from "express";
import ConversationsController from "../controllers/ConversationsController";

const router = Router();

router.post("/create", ConversationsController.createConversation);
router.get("/user/:userId", ConversationsController.getConversations);
router.post("/:conversationId", ConversationsController.addMessageToConversation);

export default router;