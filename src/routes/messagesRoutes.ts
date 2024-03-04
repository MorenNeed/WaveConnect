import { Router } from "express";
import MessagesController from "../controllers/MessagesController";

const router = Router();

router.post("/create", MessagesController.createMessage);

export default router;