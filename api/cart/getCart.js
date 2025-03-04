import { useQuery ,useQueryClient,useMutation} from "@tanstack/react-query";
import { api ,temp_user_id,token, user_id } from '../api';
import toast from 'react-hot-toast';
import { useState, useEffect } from "react";


export const useGetCartData = () => {
    return useQuery({
      queryKey: ['cart'],
      queryFn: async () => {
        const response = await api.post(`/carts`, JSON.stringify({
          user_id: user_id,
          temp_user_id: temp_user_id
        }),{
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type' : 'Application/json'
          },
        });
  
        if (!response || response.status !== 200) {
          throw new Error('Failed to fetch cart data');
        }
  
        console.info('cart data', response.data);
        return response.data;
      },
      onError: () => {
        toast.error('Unable to fetch cart data. Please try again later.');
      }
    });
};

// export const useGetCartData = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id) => {
//       return await api.post('/carts', JSON.stringify(id), {
//         headers: {
//              Authorization :`Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//     },
//     onError: () => {
//       console.log('Failed to get cart. Please try again.');
//     },
//     onSuccess: () => {
//       console.log('get cart successfully!');
      
//       queryClient.invalidateQueries(['cart']);
//     },
//   });
// };
export const useGetHomeCategories = () => {
  return useQuery({
    queryKey: ['home_categories'],
    queryFn: async () => {
      const response = await api.get('/home-categories')

      if (response.status !== 200) {
        throw new Error('Failed to fetch home categories');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching home categories. Please try again later.');
    },
  });
};


