import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { User } from '../models/User';

class AuthController {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await AuthService.login(email, password);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async me(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await AuthService.me();
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await AuthService.logout();
            res.end();
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, name } = req.body;
            const user = await AuthService.register(email, password, name);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
