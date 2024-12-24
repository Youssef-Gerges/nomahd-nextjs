import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetShopTopProducts = (id) => {
  if (!id) {
    throw new Error('An ID is required to fetch shop top products');
  }

  return useQuery({
    queryKey: ['shop-top-products', id], 
    queryFn: async () => {
      const response = await api.get(`/shops/products/top/${id}`, {
       
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch shop top products');
      }

      return response.data;
    },
    onError: () => {
      console.log('Error fetching shop top products. Please try again later.');
    },
   
  });
};
