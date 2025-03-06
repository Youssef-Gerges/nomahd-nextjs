import { useMutation } from "@tanstack/react-query";
import {api, token} from '../api';

export const useWalletPay = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/payments/pay/wallet', data, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });


      return response.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
    },
  });
};
