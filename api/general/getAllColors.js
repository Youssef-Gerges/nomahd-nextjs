import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAllColors = () => {
  return useQuery({
    queryKey: ['colors'],
    queryFn: async () => {
      const response = await api.get('/colors', {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch colors');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching colors. Please try again later.');
    },
  });
};
