import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetBestSellingProducts = () => {
  return useQuery({
    queryKey: ['best-selling-products'],
    queryFn: async () => {
      const response = await api.get('/products/best-seller', {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch best selling products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching best selling products. Please try again later.');
    },
   
  });
};
