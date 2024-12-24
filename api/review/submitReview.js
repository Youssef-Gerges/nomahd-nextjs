import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewDetails) => {
      try {
        const response = await api.post('/reviews/submit', reviewDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'SYSTEM-KEY': 'NOMAHD-SECRIT',
          },
        });
        return response.data; 
      } catch (error) {
        console.error('Error submitting review:', error);
        throw new Error('Failed to submit review'); 
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit review. Please try again.');
    },
    onSuccess: () => {
      toast.success('review submitted successfully!');
      queryClient.invalidateQueries(['product-reviews']); 
    },
  });
};
