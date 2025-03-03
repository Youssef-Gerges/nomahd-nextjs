import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAllShops = (page) => {
  return useQuery({
    queryKey: ['shops', page],
    queryFn: async () => {
      const response = await api.get('/shops?page=' + page);

      if (response.status !== 200) {
        throw new Error('Failed to fetch shops');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching shops. Please try again later.');
    },
  });
};
