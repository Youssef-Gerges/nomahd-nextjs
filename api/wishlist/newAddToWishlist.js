import { useMutation } from '@tanstack/react-query';
import { api, token } from '../api';

// export const useAddToWishlistNew = () => {
//   return useMutation(
//     async ({ productId, userId }) => {
//       if (!productId || !userId) {
//         throw new Error('Both productId and userId are required');
//       }

//       try {
//         const response = await api.get('/wishlists-add-product', {
//           params: {
//             product_id: productId,
//             user_id: userId,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'SYSTEM-KEY': 'NOMAHD-SECRIT',
//           },
//         });

//         if (response.status !== 200) {
//           throw new Error('Failed to add product to wishlist');
//         }

//         return response.data; 
//       } catch (error) {
//         console.error('Error adding product to wishlist:', error);
//         throw new Error(error.message || 'An error occurred while adding product to wishlist');
//       }
//     },
//     {
//       onError: (error) => {
//         console.error(`Error: ${error.message}`);
//       },
//       onSuccess: () => {
//         console.success('Product added to wishlist successfully!');
//       },
//     }
//   );
// };


export const useAddToWishlistNew = () => {
  return useMutation({
    mutationFn: async ({ productId, userId }) => {
      const response = await api.get("/wishlists-add-product", {
        params: { product_id: productId, user_id: userId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};