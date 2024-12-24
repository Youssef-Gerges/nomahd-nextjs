import { useQuery } from "@tanstack/react-query";
import { api ,token} from '../api';
import toast from 'react-hot-toast';

export const useGetPurchaseHistoryItems = (userId) => {
  return useQuery({
    queryKey: ['purchase-history-items', userId],
    queryFn: async () => {
      const response = await api.get(`/purchase-history-items/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'SYSTEM-KEY': "NOMAHD-SECRIT" 
        },
      });

      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch purchase history items');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Unable to fetch purchase history items. Please try again later.');
    }
  });
};
