import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetShopNewArrival = (id) => {
  if (!id) {
    throw new Error('An ID is required to fetch shop new arrival');
  }

  return useQuery({
    queryKey: ['shop-new-arrival', id], 
    queryFn: async () => {
      const response = await api.get(`/shops/products/new/${id}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch shop new arrival');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching shop new arrival. Please try again later.');
    },
   
  });
};
