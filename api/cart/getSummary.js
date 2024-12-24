import { useQuery } from "@tanstack/react-query";
import { api ,token} from '../api';
import toast from 'react-hot-toast';

export const useGetSummary = (userId) => {
  return useQuery({
    queryKey: ['summary', userId],
    queryFn: async () => {
      const response = await api.get(`/cart-summary/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'SYSTEM-KEY': "NOMAHD-SECRIT" 
        },
      });

      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch cart summary');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Unable to fetch cart summary. Please try again later.');
    }
  });
};
