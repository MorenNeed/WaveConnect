import { Request, Response,NextFunction } from "express";
import { User } from "../models/User";
import UsersService from "../services/UsersService";

class UsersController {
    async searchUsersByEmailQuery(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const emailQuery = req.query.emailQuery as string;
            const users = await UsersService.searchUsersByEmailQuery(emailQuery);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

export default new UsersController();