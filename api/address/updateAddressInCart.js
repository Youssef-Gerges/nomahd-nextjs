import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useUpdateAddressInCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      try {
        const response = await api.post('/update-address-in-cart', userData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'SYSTEM-KEY': 'NOMAHD-SECRIT',
          },
        });
        return response.data; 
      } catch (error) {
        console.error('Error updating user address:', error);
        throw new Error('Failed to update user address'); 
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user address. Please try again.');
    },
    onSuccess: () => {
      toast.success('Address updated successfully!');
      queryClient.invalidateQueries(['userAddress']); 
    },
  });
};
