
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import toast from 'react-hot-toast';

export const useUpdateDeliveryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await api.post('/delivery-boy/change-delivery-status', data, {
        headers: {
           Authorization :`Bearer ${token}`,
          'Content-Type': 'application/json',
          'SYSTEM-KEY': "NOMAHD-SECRIT", 
        },
      });
    },
    onError: () => {
      toast.error('Failed to update delivery status. Please try again.');
    },
    onSuccess: () => {
      toast.success('Delivery status updated successfully!');
      
      queryClient.invalidateQueries(['delivery-list']);
    },
  });
};
