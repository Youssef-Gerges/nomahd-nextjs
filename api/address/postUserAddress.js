import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useAddUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      try {
        const response = await api.post('/user/shipping/create', userData, {
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
