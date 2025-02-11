import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetSupportPolicy = () => {
  return useQuery({
    queryKey: ['support-policy'],
    queryFn: async () => {
      const response = await api.get('/policies/support');

      if (response.status !== 200) {
        throw new Error('Failed to fetch support policy');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching support policy. Please try again later.');
    },
  });
};
