import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAllSliders = () => {
  return useQuery({
    queryKey: ['sliders'],
    queryFn: async () => {
      const response = await api.get('/sliders', {
       
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
