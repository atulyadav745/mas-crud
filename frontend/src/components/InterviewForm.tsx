import { useState, ChangeEvent } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TextFieldProps,
} from '@mui/material';
import { useRouter } from 'next/router';
import { interviewService } from '../services/interviewService';
import { Interview } from '../types';

interface InterviewFormProps {
  initialData?: Interview;
  isEdit?: boolean;
}

interface FormData {
  candidateName: string;
  interviewDate: string;
  interviewTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export default function InterviewForm({ initialData, isEdit }: InterviewFormProps) {
  const [formData, setFormData] = useState<FormData>({
    candidateName: initialData?.candidateName || '',
    interviewDate: initialData?.interviewDate?.split('T')[0] || '',
    interviewTime: initialData?.interviewTime || '',
    status: initialData?.status || 'scheduled',
    notes: initialData?.notes || '',
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && initialData?._id) {
        await interviewService.update(initialData._id, formData);
      } else {
        await interviewService.create(formData);
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save interview:', error);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Interview' : 'New Interview'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Candidate Name"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleTextChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Date"
          name="interviewDate"
          type="date"
          value={formData.interviewDate}
          onChange={handleTextChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Time"
          name="interviewTime"
          type="time"
          value={formData.interviewTime}
          onChange={handleTextChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
            label="Status"
          >
            <MenuItem value="scheduled">Scheduled</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleTextChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/dashboard')}
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
} 