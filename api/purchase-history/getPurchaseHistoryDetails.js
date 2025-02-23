import { useQuery } from "@tanstack/react-query";
import { api ,token} from '../api';
import toast from 'react-hot-toast';

export const useGetPurchaseHistoryDetails = (orderId) => {
  return useQuery({
    queryKey: ['purchase-history-details', orderId],
    queryFn: async () => {
      const response = await api.get(`/purchase-history-details/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch purchase history details');
      }

      return response.data.data[0];
    },
    onError: () => {
      toast.error('Unable to fetch purchase history details. Please try again later.');
    },
      enabled: !!orderId,
  });
};
