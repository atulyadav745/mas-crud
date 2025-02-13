import { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import InterviewForm from '../../../components/InterviewForm';
import { interviewService } from '../../../services/interviewService';

export default function EditInterview() {
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      loadInterview();
    }
  }, [id]);

  const loadInterview = async () => {
    try {
      const data = await interviewService.getAll();
      const interview = data.find((i: any) => i._id === id);
      if (interview) {
        setInterview(interview);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Failed to load interview:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <InterviewForm initialData={interview || undefined} isEdit />
    </Container>
  );
} 