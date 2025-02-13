import express, { Router } from 'express';
import { userController } from '../controllers/userController';

const router: Router = express.Router();

router.post('/register', userController.register as express.RequestHandler);
router.post('/login', userController.login as express.RequestHandler);

export const userRouter = router; 