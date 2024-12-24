
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import toast from 'react-hot-toast';

export const useCartProccess = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await api.post('/carts/process', data, {
        // headers: {
        //      Authorization :`Bearer ${token}`,
        //   'Content-Type': 'application/json',
        //   'SYSTEM-KEY': "NOMAHD-SECRIT", 
        // },
      });
    },
    onError: () => {
      // toast.error('Failed to proccess cart. Please try again.');
    },
    onSuccess: () => {
      // toast.success('cart proccessed successfully!');
      queryClient.invalidateQueries(['cart']);
    },
  });
};
