import { Request, Response } from 'express';
import { User, UserDocument } from '../models/User';
import jwt from 'jsonwebtoken';

interface UserResponse {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
}

const formatUserResponse = (user: UserDocument): UserResponse => ({
  _id: user._id.toString(),
  email: user.email,
  name: user.name,
  createdAt: user.createdAt
});

export const userController = {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, name } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const user = new User({ email, password, name });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
      return res.status(201).json({ 
        user: formatUserResponse(user),
        token 
      });
    } catch (error) {
      return res.status(400).json({ error: 'Registration failed' });
    }
  },

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
      return res.json({ 
        user: formatUserResponse(user),
        token 
      });
    } catch (error) {
      return res.status(400).json({ error: 'Login failed' });
    }
  }
}; 