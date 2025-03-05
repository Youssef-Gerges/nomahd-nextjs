import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetTrackBar = () => {
  return useQuery({
    queryKey: ['home-track-bar'],
    queryFn: async () => {
      const response = await api.get('/home-track-bar', {
       
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch sliders');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Error fetching sliders. Please try again later.');
    },
  });
};
