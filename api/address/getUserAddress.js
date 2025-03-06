import {useQuery} from '@tanstack/react-query';
import {api, token} from '../api';
import toast from 'react-hot-toast';

export const useGetUserAddress = () => {
    return useQuery({
            queryKey: ['userAddress'],
            queryFn: async () => {

                try {
                    const response = await api.get(`user/shipping/address`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });

                    if (response.status !== 200) {
                        throw new Error('Failed to fetch user address');
                    }

                    return response.data;
                } catch (error) {
                    console.error('Error fetching user address:', error);
                    throw new Error(error.message || 'An error occurred while fetching the user address');
                }
            },
            onError: (error) => {
                toast.error(`Error: ${error.message}`);
            },
            onSuccess:
                () => {
                    toast.success('User address fetched successfully');
                }
        },
    );
}
