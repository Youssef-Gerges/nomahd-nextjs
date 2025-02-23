import { useMutation } from "@tanstack/react-query";
import {api, token} from '../api';

export const useGetUserByAccessToken = () => {
    return useMutation({

      mutationFn: async () => {
        return await api.post('/get-user-by-access_token', {
            access_token: token
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
    });
  };    