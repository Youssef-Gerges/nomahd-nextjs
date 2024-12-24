
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export const useGetTopCategories = () => {
  return useQuery({
    queryKey: ['top_categories'],
    queryFn: async () => {
      const response = await api.get('/categories/top', {
      
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch top categories');
      }

      return response.data;
    },
    onError: () => {
      console.log('Error fetching top categories. Please try again later.');
    },
  });
};

