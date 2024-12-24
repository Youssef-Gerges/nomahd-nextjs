import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAdminProducts = (page = 1) => {
  return useQuery({
    queryKey: ['admin-products', page],
    queryFn: async () => {
      const response = await api.get(`/products/admin?page=${page}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch admin products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching admin products. Please try again later.');
    },
    keepPreviousData: true, // Retains previous data during pagination
  });
};
