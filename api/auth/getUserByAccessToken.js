import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';

export const useGetUserByAccessToken = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      onError: () => {
        toast.error('Failed to get user. Please try again.');
      },
      onSuccess: () => {
        toast.success('User get successfully');
        queryClient.invalidateQueries(['get_user']); 
      },
      mutationFn: async (data) => {
        return await api.post('/get-user-by-access_token', data, {
          headers: {
            'Content-Type': 'application/json',
            'SYSTEM-KEY':"NOMAHD-SECRIT"
          },
        });
      },
    });
  };    