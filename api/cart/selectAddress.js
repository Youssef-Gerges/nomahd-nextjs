import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useSelectAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await api.post('/update-address-in-cart', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data; 
      } catch (error) {
        console.error('Error adding user address:', error);
        throw new Error('Failed to add user address'); 
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add user address. Please try again.');
    },
    onSuccess: () => {
      toast.success('Address added to user successfully!');
      queryClient.invalidateQueries(['userAddress']); 
    },
  });
};
