import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetBrandProducts = (page = 1, id) => {
  return useQuery({
    queryKey: ['brand-products', id, page],
    queryFn: async () => {
      const response = await api.get(`/products/brand/${id}?page=${page}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch brand products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching brand products. Please try again later.');
    },
    keepPreviousData: true, // Keeps previous data when changing pages
  });
};
