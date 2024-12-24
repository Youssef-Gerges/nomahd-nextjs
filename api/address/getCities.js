import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const response = await api.get('/cities', {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch cities');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching cities. Please try again later.');
    },
  });
};
