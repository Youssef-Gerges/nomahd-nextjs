import { useMutation} from "@tanstack/react-query";
import {api, token} from '../api';

// export const useDeleteFromCart = () => {
//     return useMutation(
//       async (id) => {
//         if (!id) {
//           throw new Error('An ID is required to delete from cart');
//         }
//         try {
//           const response = await api.delete(`/carts/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
  
//           if (response.status !== 200) {
//             throw new Error('Failed to remove product from cart');
//           }
  
//           return response.data; 
//         } catch (error) {
//           console.error('Error deleting product from cart:', error);
//           throw new Error(error.message || 'An error occurred while removing product from cart');
//         }
//       }
     
//     );
//   };

export const useDeleteFromCart = () => {
  return useMutation({
    mutationFn: async (id) => {
      if (!id) {
        throw new Error('An ID is required to delete from cart');
      }
      try {
        const response = await api.delete(`/carts/${id}`, {
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
