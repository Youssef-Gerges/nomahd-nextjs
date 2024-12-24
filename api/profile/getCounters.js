import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetUserCounters = (userId) => {
  return useQuery(
    ['userCounters', userId], 
    async () => {
      if (!userId) {
        throw new Error('User ID is required to fetch counters');
      }

      try {
        const response = await api.get(`/profile/counters/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'SYSTEM-KEY': 'NOMAHD-SECRIT',
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch user counters');
        }

        return response.data; 
      } catch (error) {
        console.error('Error fetching user counters:', error);
        throw error; 
      }
    },
    {
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
      onSuccess: (data) => {
        toast.success('User counters fetched successfully');
      },
      enabled: !!userId,
    }
  );
};
