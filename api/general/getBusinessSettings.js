import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetBusinessSettings = () => {
  return useQuery({
    queryKey: ['business-settings'],
    queryFn: async () => {
      const response = await api.get('/business-settings');

      if (response.status !== 200) {
        throw new Error('Failed to fetch business settings');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching business settings. Please try again later.');
    },
  });
};
