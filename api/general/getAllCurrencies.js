import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAllCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const response = await api.get('/currencies', {
        // headers: {
        //   'SYSTEM-KEY': 'NOMAHD-SECRIT',
        // },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch currencies');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching currencies. Please try again later.');
    },
  });
};
