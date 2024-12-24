import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, token } from '../api';

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData) => {
      try {
        const response = await api.post('/wishlists', JSON.stringify(productData), {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept':'application/json'
          },
        });
        return response.data; 
      } catch (error) {
        console.error('Error adding product to wishlist:', error);
        throw new Error('Failed to add product to wishlist'); 
      }
    },
    onError: (error) => {
      console.error(error.message || 'Failed to add product to wishlist. Please try again.');
    },
    onSuccess: () => {
      console.success('Product added to wishlist successfully!');
      queryClient.invalidateQueries(['wishlist']); 
    },
  });
};
