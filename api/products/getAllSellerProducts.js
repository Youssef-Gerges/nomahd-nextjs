import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetSellerProducts = (page = 1, id) => {
  return useQuery({
    queryKey: ['seller-products', id, page], 
    queryFn: async () => {
      const response = await api.get(`shops/products/all/${id}?page=${page}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch seller products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching seller products. Please try again later.');
    },
   
  });
};
