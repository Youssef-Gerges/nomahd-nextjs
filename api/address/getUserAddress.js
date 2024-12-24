import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetUserAddress = (id) => {
  return useQuery(
    ['userAddress', id], 
    async () => {
      if (!id) {
        throw new Error('An ID is required to fetch the user address');
      }

      try {
        const response = await api.get(`/user/shipping/address/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'SYSTEM-KEY': 'NOMAHD-SECRIT',
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch user address');
        }

        return response.data; 
      } catch (error) {
        console.error('Error fetching user address:', error);
        throw new Error(error.message || 'An error occurred while fetching the user address');
      }
    },
    {
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
      onSuccess: () => {
        toast.success('User address fetched successfully');
      },
    }
  );
};
