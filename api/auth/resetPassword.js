import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';

export const useSendToMail = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      onError: () => {
        console.log('Sending failed. Please try again.');
      },
      onSuccess: () => {
        console.log('Email sent successfully');
        queryClient.invalidateQueries(['send_mail']); 
      },
      mutationFn: async (email) => {
        return await api.post('/auth/password/forget_request', JSON.stringify(email), {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept':'application/json'
          },
        });
      },
    });
  };