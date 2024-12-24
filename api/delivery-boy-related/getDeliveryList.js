import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetDeliveryList = ({ payment_type, delivery_boy_id, date_range }) => {
  return useQuery({
    queryKey: ['delivery-list', payment_type, delivery_boy_id, date_range],
    queryFn: async () => {
      const response = await api.get('/delivery-boy/deliveries/completed/', {
        params: {
            delivery_boy_id,
            date_range,
            payment_type
        },
        headers: {
           Authorization:`Bearer ${token}`,
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch delivery list');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching delivery list. Please try again later.');
    },
   
  });
};
