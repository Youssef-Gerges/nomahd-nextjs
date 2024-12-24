import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useDeleteUserAddress = (id) => {
  return useQuery(
    ['Delete-address', id], 
    async () => {
      if (!id) {
        throw new Error('An ID is required to delete the user address');
      }

      try {
        const response = await api.get(`/user/shipping/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'SYSTEM-KEY': 'NOMAHD-SECRIT',
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to delete user address');
        }

        return response.data; 
      } catch (error) {
        console.error('Error deleting user address:', error);
        throw new Error(error.message || 'An error occurred while deleting the user address');
      }
    },
    {
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
      onSuccess: () => {
        toast.success('User address deleted successfully');
      },
    }
  );
};
