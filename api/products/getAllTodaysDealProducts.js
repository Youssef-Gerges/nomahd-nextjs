import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAllTodaysDealProducts = () => {
  return useQuery({
    queryKey: ['todays-deal-products'],
    queryFn: async () => {
      const response = await api.get('/products/todays-deal', {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch todays deal products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching today\'s deal products. Please try again later.');
    },
  });
};
