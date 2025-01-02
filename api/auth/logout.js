// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { api ,token} from "../api";

// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async () => {
//       // Retrieve the token from localStorage
//       if (!token) {
//         throw new Error('No token found');
//       }

//       const response = await api.get('/auth/logout', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status !== 200) {
//         throw new Error('Logout failed');
//       }
//       return response.data;
//     },
//     onSuccess: () => {
//       // Clear local storage and invalidate queries
//       queryClient.invalidateQueries(['wishlist','cart','user'])
//       localStorage.removeItem('token');
//       localStorage.removeItem('id');
//       localStorage.removeItem('name');
//       // queryClient.clear();
//       console.log('Logged out successfully');
//     },
//     onError: (error) => {
//       console.error('Logout error:', error.message || 'Failed to logout');
//     },
//   });
// };
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, token } from "../api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get('/auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Logout failed');
      }
      return response.data;
    },
    onSuccess: () => {
      // Step 1: Remove sensitive data
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('name');

      // Step 2: Clear cart and wishlist data from the cache
      queryClient.setQueryData(['wishlist'], []); // Empty the wishlist
      queryClient.setQueryData(['cart'], []); // Empty the cart

      // Step 3: Invalidate the queries to ensure a clean state
      queryClient.invalidateQueries({ queryKey: 'wishlist' });
      queryClient.invalidateQueries({ queryKey: 'cart' });
      console.log('Logged out successfully and cleared cart/wishlist data');
      
    },
    onError: (error) => {
      console.error('Logout error:', error.message || 'Failed to logout');
    },
  });
};
