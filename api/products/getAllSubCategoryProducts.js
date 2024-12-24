import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetSubCategoryProducts = (page = 1, id) => {
  return useQuery({
    queryKey: ['sub-category-products', id, page],
    queryFn: async () => {
      const response = await api.get(`/products/sub-category/${id}?page=${page}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch sub-category products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching sub-category products. Please try again later.');
    },
   
  });
};
