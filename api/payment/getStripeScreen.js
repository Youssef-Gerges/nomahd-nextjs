import { useMutation } from "@tanstack/react-query";
import {api} from '../api';

export const useCreateStripeSession = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/stripe', data);

      if (!response.data || !response.data.url) {
        throw new Error('Failed to create Stripe session');
      }

      return response.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
    },
  });
};
