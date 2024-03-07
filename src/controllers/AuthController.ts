import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

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
            const token = req.headers.authorization || null;
            const user = await AuthService.me(token);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.headers.authorization || null;
            await AuthService.logout(token);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, name } = req.body;
            const user = await AuthService.register(email, password, name);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
