import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetReturnPolicy = () => {
  return useQuery({
    queryKey: ['return-policy'],
    queryFn: async () => {
      const response = await api.get('/policies/return');

      if (response.status !== 200) {
        throw new Error('Failed to fetch return policy');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching return policy. Please try again later.');
    },
  });
};
