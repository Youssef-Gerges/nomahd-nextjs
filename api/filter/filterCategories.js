import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useFilterCategories = () => {
  return useQuery({
    queryKey: ['filter-categories'],
    queryFn: async () => {
      const response = await api.get('/filter/categories', {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to filter categories');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error filtering categories. Please try again later.');
    },
  });
};
