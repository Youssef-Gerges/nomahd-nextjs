import { useMutation } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useDeleteFromWishlist = () => {
  return useMutation(
    async (id) => {
      if (!id) {
        throw new Error('An ID is required to delete from wishlist');
      }
      try {
        const response = await api.delete(`/wishlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'SYSTEM-KEY': 'NOMAHD-SECRIT',
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to delete product from wishlist');
        }

        return response.data; 
      } catch (error) {
        console.error('Error deleting product from wishlist:', error);
        throw new Error(error.message || 'An error occurred while deleting product from wishlist');
      }
    },
    {
    
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
      onSuccess: () => {
        toast.success('Product removed from wishlist successfully!');
      },
    }
  );
};
