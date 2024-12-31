import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, token } from '../api';
// import toast from 'react-hot-toast';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      try {
        const response = await api.post('/profile/update', profileData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data; 
      } catch (error) {
        console.error('Error updating profile:', error);
        throw new Error('Failed to update profile'); 
      }
    },
    onError: (error) => {
      console.log(error.message || 'Failed to update profile. Please try again.');
    },
    onSuccess: () => {
      console.log('profile updated successfully!');
      queryClient.invalidateQueries(['profile']); 
    },
  });
};
