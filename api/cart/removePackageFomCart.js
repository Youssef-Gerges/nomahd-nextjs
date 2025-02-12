import { useMutation} from "@tanstack/react-query";
import {api, token, user_id} from '../api';
export const useDeletePackageFromCart = () => {
  return useMutation({
    mutationFn: async (id) => {
      if (!id) {
        throw new Error('An ID is required to delete from cart');
      }
      try {
        const response = await api.post(`/carts/remove-package`, {
          package_id: id,
          user_id: user_id
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to remove product from cart');
        }

        return response.data;
      } catch (error) {
        console.error('Error deleting product from cart:', error);
        throw new Error(error.response?.data?.message || error.message || 'An error occurred while removing product from cart');
      }
    },
    onError: (error) => {
      console.error('Mutation Error:', error.message);
    },
  });
};
