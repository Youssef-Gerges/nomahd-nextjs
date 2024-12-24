import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetSearchedProducts = () => {
  return useQuery({
    queryKey: ['searched-products'], 
    queryFn: async () => {
      const response = await api.get('/products/search', {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch searched products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching searched products. Please try again later.');
    },
   
  });
};
