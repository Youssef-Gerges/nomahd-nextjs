// import { useMutation ,useQueryClient} from "@tanstack/react-query";
// import {api, token} from '../api';

// export const useLogout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async () => {
//       const response = await api.get('/auth/logout',{headers : {Authorization:`Bearer ${token}`}
        
//       });
//       if (!response.ok) {
//         throw new Error('Logout failed');
//       }
//       return response.data;
//     },
//     onSuccess: () => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('id')
//       queryClient.clear();
      
//       console.log('Logged out successfully');
      
//     },
//     onError: (error) => {
//       console.error('Logout error:', error);
//       console.log('Failed to logout');
//     },
//   });
// };
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      
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
      // Clear local storage and invalidate queries
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      queryClient.clear();

      console.log('Logged out successfully');
    },
    onError: (error) => {
      console.error('Logout error:', error.message || 'Failed to logout');
    },
  });
};
