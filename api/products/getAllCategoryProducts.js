import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetCategoryProducts = (page = 1, id) => {
  return useQuery({
    queryKey: ['category-products', id, page],
    queryFn: async () => {
      const response = await api.get(`/products/category/${id}?page=${page}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch category products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching category products. Please try again later.');
    },
    keepPreviousData: true, // Keeps previous data when changing pages
  });
};
