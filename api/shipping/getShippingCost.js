import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetShippingCost = () => {
  return useQuery({
    queryKey: ['shipping-cost'],
    queryFn: async () => {
      const response = await api.get('/shipping_cost', {
        headers: {
            Authorization:`Bearer ${token}`,
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch shipping cost');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching shipping cost. Please try again later.');
    },
  });
};
