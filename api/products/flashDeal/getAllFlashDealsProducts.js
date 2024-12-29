import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/api';
// import toast from 'react-hot-toast';

export const useGetFlashDealProducts = (id) => {
  return useQuery({
    queryKey: ['flash-deals-products', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('An ID is required to fetch the flash deals');
      }

      const response = await api.get(`/flash-deal-products/${id}`, {
        headers: {
          'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch flash deals');
      }

      return response.data;
    },
    enabled: !!id, // Ensures the query only runs if an ID is provided
    onError: () => {
      console.log('Error fetching flash deals. Please try again later.');
    },
  });
};

