import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetRelatedProducts = (id) => {
  if (!id) {
    throw new Error('An ID is required to fetch the related products');
  }

  return useQuery({
    queryKey: ['related-products', id], 
    queryFn: async () => {
      const response = await api.get(`/products/related/${id}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch related products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching related products. Please try again later.');
    },
   
  });
};
