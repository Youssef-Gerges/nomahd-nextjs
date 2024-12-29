import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';
// import toast from 'react-hot-toast';

export const useGetAllFlashDeals = () => {
  return useQuery({
    queryKey: ['flash-deals'],
    queryFn: async () => {
      const response = await api.get('/flash-deals');

      if (response.status !== 200) {
        throw new Error('Failed to fetch flash deals');
      }

      return response.data;
    },
    onError: () => {
      console.log('Error fetching flash deals. Please try again later.');
    },
  });
};

