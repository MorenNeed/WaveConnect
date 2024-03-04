import { Router } from "express";
import UsersController from "../controllers/UsersController";

const router = Router();

router.get("/search", UsersController.searchUsersByEmailQuery);

export default router;