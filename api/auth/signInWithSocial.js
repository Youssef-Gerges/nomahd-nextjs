import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import Cookies from "js-cookie";

export const useSignInWithSocial = () => {
    const queryClient = useQueryClient();

    return useMutation({

      mutationFn: async (data) => {
        return await api.post('/auth/social-login', data,{
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
        onError: (error) => {
            console.error('Login failed:', error.response?.data?.message || error.message);
        },
        onSuccess: (data) => {
            const {access_token, user} = data.data;
            if (user.type === 'seller') {
                window.location.href = 'https://nomahd.com/seller/dashboard';
                return;
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', access_token);
                Cookies.set('token', access_token)
                localStorage.setItem('id', user.id);
                localStorage.setItem('name', user.name);
                window.location.reload();
            }
            console.log('Login successful');
            queryClient.invalidateQueries(['user']); // Adjust the query key if necessary
        },
    });
  };    