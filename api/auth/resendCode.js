import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';

export const useResendCode = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      onError: () => {
        toast.error('Sending failed. Please try again.');
      },
      onSuccess: () => {
        toast.success('Code sent successfully');
        queryClient.invalidateQueries(['send_code']); 
      },
      mutationFn: async (data) => {
        return await api.post('/auth/resend_code', data, {
          headers: {
            'Content-Type': 'application/json',
            'SYSTEM-KEY':"NOMAHD-SECRIT"
          },
        });
      },
    });
  };