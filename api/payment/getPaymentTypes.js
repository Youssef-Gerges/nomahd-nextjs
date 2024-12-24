import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetPaymentTypes = () => {
  return useQuery({
    queryKey: ['payment-types'],
    queryFn: async () => {
      const response = await api.get('/shipping_cost', {
        headers: {
            Authorization:`Bearer ${token}`,
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch payment types');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching payment types. Please try again later.');
    },
  });
};
