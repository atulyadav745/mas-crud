// src/routes/interviewRoutes.ts
import express from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { auth } from '../middleware/auth';
import { interviewController } from '../controllers/interviewController';

const router = express.Router();

router.use(auth);

router.post('/', asyncHandler(interviewController.create));
router.get('/', asyncHandler(interviewController.getAll));
router.put('/:id', asyncHandler(interviewController.update));
router.delete('/:id', asyncHandler(interviewController.delete));

export default router;
