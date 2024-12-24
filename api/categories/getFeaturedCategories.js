import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetFeaturedCategories = () => {
  return useQuery({
    queryKey: ['featured_categories'],
    queryFn: async () => {
      const response = await api.get('/categories/featured', {
       
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch featured categories');
      }

      return response.data;
    },
    onError: () => {
      console.log('Error fetching featured categories. Please try again later.');
    },
  });
};
