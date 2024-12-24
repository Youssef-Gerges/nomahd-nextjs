import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetCollectionSummary = ({ delivery_boy_id }) => {
  return useQuery({
    queryKey: ['collection-summary', delivery_boy_id],
    queryFn: async () => {
      const response = await api.get(`/delivery-boy/earning/${delivery_boy_id}`, {
        headers: {
           Authorization:`Bearer ${token}`,
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch collection summary');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching collection summary. Please try again later.');
    },
   
  });
};
