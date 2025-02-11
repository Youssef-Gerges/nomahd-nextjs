import { useQuery } from "@tanstack/react-query";
import { api ,token} from '../api';
import toast from 'react-hot-toast';

export const useGetAllProductReviews = (product_id) => {
  return useQuery({
    queryKey: ['product-reviews', product_id],
    queryFn: async () => {
      const response = await api.get(`/reviews/product/${product_id}`);

      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch product reviews');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Unable to fetch product reviews. Please try again later.');
    }
  });
};
