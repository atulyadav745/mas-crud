import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { interviewService } from '../services/interviewService';
import { useRouter } from 'next/router';

interface Interview {
  _id: string;
  candidateName: string;
  interviewDate: string;
  interviewTime: string;
  status: string;
}

export default function Dashboard() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const data = await interviewService.getAll();
      setInterviews(data);
    } catch (error) {
      console.error('Failed to load interviews:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await interviewService.delete(id);
      loadInterviews();
    } catch (error) {
      console.error('Failed to delete interview:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Interview Schedule
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/interviews/new')}
        sx={{ mb: 3 }}
      >
        New Interview
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.map((interview) => (
              <TableRow key={interview._id}>
                <TableCell>{interview.candidateName}</TableCell>
                <TableCell>{new Date(interview.interviewDate).toLocaleDateString()}</TableCell>
                <TableCell>{interview.interviewTime}</TableCell>
                <TableCell>{interview.status}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => router.push(`/interviews/edit/${interview._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(interview._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
} 