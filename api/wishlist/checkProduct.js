import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import { useMutation } from '@tanstack/react-query';

// export const useCheckProductInWishlist = (productId, userId) => {
//   return useQuery(
//     ['wishlist-check', productId, userId], // Query key includes productId and userId
//     async () => {
//       if (!productId || !userId) {
//         throw new Error('Both productId and userId are required');
//       }

//       try {
//         const response = await api.get('/wishlists-check-product', {
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
//           throw new Error('Failed to check if product is in wishlist');
//         }

//         return response.data; 
//       } catch (error) {
//         console.error('Error checking product in wishlist:', error);
//         throw new Error(error.message || 'An error occurred while checking the product in wishlist');
//       }
//     },
//     {
//       enabled: Boolean(productId && userId), // Ensures query only runs if both IDs are provided
//       retry: 2, // Optional: retry 2 times on failure
//       onError: (error) => {
//         console.error('Error checking product in wishlist:', error);
//       },
//     }
//   );
// };



export const useCheckProductInWishlist = () => {
  return useMutation({
    mutationFn: async ({ productId, userId }) => {
      const response = await api.get("/wishlists-check-product", {
        params: { product_id: productId, user_id: userId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  });
};