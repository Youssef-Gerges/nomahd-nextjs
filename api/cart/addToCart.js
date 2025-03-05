import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import toast from 'react-hot-toast';
import {useContextElement} from "@/context/Context";
import bootstrap from "bootstrap";
import {router} from "next/client";

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productData) => {
            return await api.post('/carts/add', JSON.stringify(productData), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        },
        onError: () => {
            console.log('Failed to add product to cart. Please try again.');
        },
        onSuccess: (data) => {
            toast.success("Added to cart successfully.");
            if (data?.data?.temp_user_id) {
                localStorage.setItem('temp_user_id', data.data?.temp_user_id)
            }
            location.href = '/view-cart'
            queryClient.invalidateQueries();
        },
    });
};