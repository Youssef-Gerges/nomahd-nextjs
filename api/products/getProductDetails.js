import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export const useGetProductDetails = (slug) => {
  if (!slug) {
    throw new Error('An ID is required to fetch product details');
  }

  return useQuery({
    queryKey: ['product-details', slug], 
    queryFn: async () => {
      const response = await api.get(`/products/${slug}`, 
        
      );

      if (response.status !== 200) {
        throw new Error('Failed to fetch product details');
      }

      return response.data;
    },
    onError: () => {
      console.error('Error fetching product details. Please try again later.');
    },
   
  });
};
