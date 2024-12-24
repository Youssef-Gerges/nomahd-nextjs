import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetSubCategory = (id) => {
  return useQuery({
    queryKey: ['sub-category', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('An ID is required to fetch the sub-category');
      }

      const response = await api.get(`/sub-categories/${id}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch sub-category');
      }

      return response.data;
    },
    enabled: !!id, // Ensures the query only runs if an ID is provided
    onError: () => {
      toast.error('Error fetching sub-category. Please try again later.');
    },
  });
};
