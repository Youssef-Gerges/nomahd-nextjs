    import { useQuery } from '@tanstack/react-query';
    import { api } from '../api';
    import toast from 'react-hot-toast';

    export const useGetProductVariantPrice = ({ id, color, variants }) => {
    if (!id || !color || !variants || variants.length === 0) {
        throw new Error('ID, color, and variants are required to fetch product variant price');
    }

    return useQuery({
        queryKey: ['product-variant-price', id, color, variants],
        queryFn: async () => {
        const response = await api.get('/products/variant/price', {
            params: {
            id,
            color,
            variants: variants.join(','),
            },
            headers: {
            'SYSTEM-KEY': 'NOMAHD-SECRIT',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to fetch product variant price');
        }

        return response.data;
        },
        onError: () => {
        toast.error('Error fetching product variant price. Please try again later.');
        },
    
    });
    };
