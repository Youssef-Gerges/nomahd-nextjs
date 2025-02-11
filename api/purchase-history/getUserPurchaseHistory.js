import { useQuery } from "@tanstack/react-query";
import { api ,token} from '../api';
import toast from 'react-hot-toast';

export const useGetPurchaseHistory = () => {
  return useQuery({
    queryKey: ['purchase-history'],
    queryFn: async () => {
      const response = await api.get(`/purchase-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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
