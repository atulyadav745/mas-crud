import { Response } from 'express';
import { Interview } from '../models/Interview';
import { AuthRequest } from '../middleware/auth';

export const interviewController = {
  async create(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const interview = new Interview({
        ...req.body,
        userId: req.user.userId,
      });
      await interview.save();
      return res.status(201).json(interview);
    } catch (error) {
      return res.status(400).json({ error: 'Could not create interview' });
    }
  },

  async getAll(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const interviews = await Interview.find({ userId: req.user.userId });
      return res.json(interviews);
    } catch (error) {
      return res.status(500).json({ error: 'Could not fetch interviews' });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const interview = await Interview.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        req.body,
        { new: true }
      );
      if (!interview) {
        return res.status(404).json({ error: 'Interview not found' });
      }
      return res.json(interview);
    } catch (error) {
      return res.status(400).json({ error: 'Could not update interview' });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const interview = await Interview.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId,
      });
      if (!interview) {
        return res.status(404).json({ error: 'Interview not found' });
      }
      return res.json({ message: 'Interview deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Could not delete interview' });
    }
  }
}; 