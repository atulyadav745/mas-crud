import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  interviewTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Interview = mongoose.model('Interview', interviewSchema); 