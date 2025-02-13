export interface Interview {
  _id: string;
  candidateName: string;
  interviewDate: string;
  interviewTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  userId: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
} 