import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';

// export const useGetUserWishlist = () => {
//   return useQuery({
//     queryKey: ['wishlist'], // The key for this query
//     queryFn: async () => {
  
//       try {
//         const response = await api.get(`/wishlists`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status !== 200) {
//           throw new Error('Failed to fetch wishlist');
//         }

//         return response.data;
//       } catch (error) {
//         console.error('Error fetching wishlist:', error);
//         throw new Error(error.message || 'An error occurred while fetching the wishlist');
//       }
//     },
//     onError: (error) => {
//       console.log(`Error: ${error.message}`);
//     },
//   });
// };

export const useGetUserWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await api.get(`/wishlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch wishlist data');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Unable to fetch wishlist data. Please try again later.');
    }
  });
};