import { Router } from "express";
import MessagesController from "../controllers/MessagesController";
import expressFormidable from "express-formidable";

const router = Router();

router.post("/create", expressFormidable(), MessagesController.createMessage);

export default router;