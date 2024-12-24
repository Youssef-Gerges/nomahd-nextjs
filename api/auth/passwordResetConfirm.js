import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';

export const useConfirmResetPassword = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      onError: () => {
        toast.error('reset failed. Please try again.');
      },
      onSuccess: () => {
        toast.success('Password reset successfully');
        queryClient.invalidateQueries(['confirm_reset']); 
      },
      mutationFn: async (data) => {
        return await api.post('/auth/password/confirm_reset', data, {
          headers: {
            'Content-Type': 'application/json',
            'SYSTEM-KEY':"NOMAHD-SECRIT"
          },
        });
      },
    });
  };