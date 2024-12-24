
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
          'Content-Type': 'application/json',
          'SYSTEM-KEY': "NOMAHD-SECRIT", 
        },
      });
    },
    onError: () => {
      toast.error('Failed to apply coupon. Please try again.');
    },
    onSuccess: () => {
      toast.success('Coupon applied successfully!');
      
      queryClient.invalidateQueries(['cart']);
    },
  });
};
