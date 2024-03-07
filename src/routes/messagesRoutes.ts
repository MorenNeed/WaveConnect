import { Router } from "express";
import MessagesController from "../controllers/MessagesController";
import expressFormidable from "express-formidable";

const router = Router();

router.post("/", expressFormidable({ multiples: true }), MessagesController.createMessage);
router.put("/:messageId", MessagesController.updateMessage);
router.delete("/:messageId", MessagesController.deleteMessage);

export default router;