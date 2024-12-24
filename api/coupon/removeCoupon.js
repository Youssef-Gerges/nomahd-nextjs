
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import toast from 'react-hot-toast';

export const useRemoveCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await api.post('/coupon-remove', data, {
        headers: {
          Authorization :`Bearer ${token}`,
          'Content-Type': 'application/json',
          'SYSTEM-KEY': "NOMAHD-SECRIT", 
        },
      });
    },
    onError: () => {
      toast.error('Failed to remove coupon. Please try again.');
    },
    onSuccess: () => {
      toast.success('Coupon removed successfully!');
      
      queryClient.invalidateQueries(['cart']);
    },
  });
};
