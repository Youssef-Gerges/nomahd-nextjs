import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileImage) => {
      try {
        const response = await api.post('/profile/update-image', profileImage, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'SYSTEM-KEY': 'NOMAHD-SECRIT',
          },
        });
        return response.data; 
      } catch (error) {
        console.error('Error updating profile image:', error);
        throw new Error('Failed to update profile image'); 
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile image. Please try again.');
    },
    onSuccess: () => {
      toast.success('profile image updatted successfully!');
      queryClient.invalidateQueries(['profile']); 
    },
  });
};
