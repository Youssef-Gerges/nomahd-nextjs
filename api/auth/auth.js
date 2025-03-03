import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import Cookies from 'js-cookie'

export const registerUser = async (userData) => {
    const response = await fetch('https://nomahd.com/api/v2/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'SYSTEM-KEY':'NOMAHD-SECRIT'
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to register');
    }

    console.log("res : ", response)
    return response.json();
};

export const loginUser = async (userData) => {
    const response = await fetch('http://nomahd.shop/api/v2/auth/login', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   // 'SYSTEM-KEY':'NOMAHD-SECRIT'
        // },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    console.log("res : ", response)
    return response.json();
};


export const registerUserr = async (userData) => {
    try {
        const response = await fetch('http://nomahd.com/api/v2/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();

        // Store token in localStorage if provided
        // if (data.token && typeof window !== 'undefined') {
        //   localStorage.setItem('token', data.token);
        // }

        // Return the server response
        return data;
    } catch (error) {
        console.error('Error during registration:', error.message || error);
        throw new Error(error.message || 'An error occurred during registration.');
    }
};


export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        onError: (error) => {
            console.error('Register failed:', error.response?.data?.message || error.message);
        },
        onSuccess: (data) => {
            const {access_token, user} = data.data;
            if (user.type === 'seller') {
                window.location.href = 'https://nomahd.com/seller/dashboard';
                return;
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', access_token);
                localStorage.setItem('id', user.id)
                localStorage.setItem('name', user.name)
                Cookies.set('token', access_token)

            }
            console.log('Registration successful');
            queryClient.invalidateQueries(['register_user']);
        },
        mutationFn: async (userData) => {
            return await api.post('/auth/signup', JSON.stringify(userData)
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'

                    },
                }
            );
        },
    });
};


export const useSellerRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        onError: (error) => {
            console.error('Register failed:', error.response?.data?.message || error.message);
        },
        onSuccess: (data) => {
            const {user} = data.data;
            if (user.type === 'seller') {
                window.location.href = 'https://nomahd.com/seller/dashboard';
                return;
            }
        },
        mutationFn: async (userData) => {
            return await api.post('/shops', JSON.stringify(userData)
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                }
            );
        },
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
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
            }
            console.log('Login successful');
            queryClient.invalidateQueries(['user']); // Adjust the query key if necessary
        },
        mutationFn: async (credentials) => {
            return await api.post('/auth/login', JSON.stringify(credentials), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        },
    });
};
  
  


