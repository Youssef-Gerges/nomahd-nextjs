import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetUserShop = (user_id) => {
  if (!id) {
    throw new Error('An ID is required to fetch user shop');
  }

  return useQuery({
    queryKey: ['user-shop', user_id], 
    queryFn: async () => {
      const response = await api.get(`/shop/user/${user_id}`, {
        headers: {
          Authorization:`Bearer ${token}`,
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch user shop');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching user shop. Please try again later.');
    },
   
  });
};
