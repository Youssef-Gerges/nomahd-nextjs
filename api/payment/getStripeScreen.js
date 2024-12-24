import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetStripeScreen = ({ payment_type, order_id, amount,user_id }) => {
  if (!id || !color || !variants || variants.length === 0) {
    throw new Error('payment type, order id, amount, and user id are required to fetch stripe screen');
  }

  return useQuery({
    queryKey: ['stripe-screen', payment_type, order_id, amount,user_id],
    queryFn: async () => {
      const response = await api.get('/stripe', {
        params: {
          payment_type,
          order_id,
          amount,
          user_id
        },
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch stripe screen');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching stripe screen. Please try again later.');
    },
   
  });
};
