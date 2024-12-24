import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useFilterBrands = () => {
  return useQuery({
    queryKey: ['filter-brands'],
    queryFn: async () => {
      const response = await api.get('/filter/brands', {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to filter brands');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error filtering brands. Please try again later.');
    },
  });
};
