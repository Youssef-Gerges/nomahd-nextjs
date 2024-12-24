import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetTopBrands = () => {
  return useQuery({
    queryKey: ['top-brands'],
    queryFn: async () => {
      const response = await api.get('/brands/top', {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch top brands');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching top brands. Please try again later.');
    },
  });
};
