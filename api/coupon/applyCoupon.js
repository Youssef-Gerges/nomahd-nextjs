
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import toast from 'react-hot-toast';

export const useApplyCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await api.post('/coupon-apply', data, {
        headers: {
          Authorization :`Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
    },
    onError: () => {
      toast.error('Failed to apply coupon. Please try again.');
    }
  });
};
