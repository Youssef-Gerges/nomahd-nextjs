import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetShopFeaturedProducts = (id) => {
  if (!id) {
    throw new Error('An ID is required to fetch shop featured products');
  }

  return useQuery({
    queryKey: ['shop-featured-products', id], 
    queryFn: async () => {
      const response = await api.get(`/shops/products/featured/${id}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch shop featured products');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching shop featured products. Please try again later.');
    },
   
  });
};
