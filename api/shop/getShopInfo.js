import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetShopDetails = (id) => {
  if (!id) {
    throw new Error('An ID is required to fetch shop details');
  }

  return useQuery({
    queryKey: ['shop-details', id], 
    queryFn: async () => {
      const response = await api.get(`/shops/details/${id}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch shop details');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching shop details. Please try again later.');
    },
   
  });
};
