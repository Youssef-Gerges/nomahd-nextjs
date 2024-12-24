import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAllBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const response = await api.get('/brands', {
        // headers: {
        //   'SYSTEM-KEY': 'NOMAHD-SECRIT',
        // },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch brands');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching brands. Please try again later.');
    },
  });
};
