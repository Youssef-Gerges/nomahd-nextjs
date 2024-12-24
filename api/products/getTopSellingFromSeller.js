import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetTopFromSellerProducts = (id) => {
  if (!id) {
    throw new Error('An ID is required to fetch the top from seller products');
  }

  return useQuery({
    queryKey: ['top-from-seller-products', id],
    queryFn: async () => {
      const response = await api.get(`/products/top-from-seller/${id}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch top from seller products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching top from seller products. Please try again later.');
    },
   
  });
};
