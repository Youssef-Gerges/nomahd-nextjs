import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import toast from 'react-hot-toast';

export const useChangeQuantity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productData) => {
            return await api.post('/carts/change-quantity', JSON.stringify(productData), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        },
        onError: () => {
            toast.error('Failed to change product.');
        },
        onSuccess: (data) => {
            if(data.data.result){
                toast.success("Product quantity changed successfully.");
            }else{
                toast.error(data.data.message);
            }
            queryClient.invalidateQueries();
        },
    });
};