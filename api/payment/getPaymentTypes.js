import { useQuery } from '@tanstack/react-query';
import {api, token} from '../api';
import toast from 'react-hot-toast';

export const useGetPaymentTypes = () => {
  return useQuery({
    queryKey: ['payment-types'],
    queryFn: async () => {
      const response = await api.get('/payment-types', {
        headers: {
            Authorization:`Bearer ${token}`,
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
