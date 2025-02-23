import { useQuery } from '@tanstack/react-query';
import { api, token } from '../api';
import toast from 'react-hot-toast';

export const useGetPurchaseHistoryItems = (orderId) => {
    return useQuery({
        queryKey: ['purchase-history-items', orderId],
        queryFn: async () => {
            if (!token) {
                throw new Error('Authorization token is missing');
            }

            const response = await api.get(`/purchase-history-items/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response || response.status !== 200) {
                throw new Error('Failed to fetch purchase history items');
            }

            return response.data;
        },
        onError: () => {
            toast.error('Unable to fetch purchase history items. Please try again later.');
        },
        enabled: !!orderId,
    });
};