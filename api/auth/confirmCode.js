import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import toast from "react-hot-toast";

export const useConfirmCode = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      onError: () => {
        toast.error('Sending failed. Please try again.');
      },
      onSuccess: () => {
        toast.success('Code confirmed successfully');
        queryClient.invalidateQueries(['confirm_code']); 
      },
      mutationFn: async (data) => {
        return await api.post('/auth/confirm_code', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
      },
    });
  };