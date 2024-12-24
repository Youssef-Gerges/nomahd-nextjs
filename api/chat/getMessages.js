import { useQuery } from "@tanstack/react-query";
import { api ,token} from '../api';
import toast from 'react-hot-toast';

export const useGetMessages = (userId) => {
  return useQuery({
    queryKey: ['messages', userId],
    queryFn: async () => {
      const response = await api.get(`/chat/messages/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'SYSTEM-KEY': "NOMAHD-SECRIT" 
        },
      });

      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch messages');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Unable to fetch messages. Please try again later.');
    }
  });
};
