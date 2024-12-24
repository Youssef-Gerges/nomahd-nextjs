import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAllShops = () => {
  return useQuery({
    queryKey: ['shops'],
    queryFn: async () => {
      const response = await api.get('/shops');

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
