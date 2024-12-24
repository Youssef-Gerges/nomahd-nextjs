import { useQuery } from "@tanstack/react-query";
import { api ,token} from '../api';
import toast from 'react-hot-toast';

export const useGetPurchaseHistory = (userId) => {
  return useQuery({
    queryKey: ['purchase-history', userId],
    queryFn: async () => {
      const response = await api.get(`/purchase-history/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'SYSTEM-KEY': "NOMAHD-SECRIT" 
        },
      });

      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch purchase history');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Unable to fetch purchase history. Please try again later.');
    }
  });
};
