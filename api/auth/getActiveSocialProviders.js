import {useQuery} from "@tanstack/react-query";
import {api} from '../api';

export const useGerActiveSocialProviders = () => {
    return useQuery({
        queryKey: ['social_provider'],
        queryFn: async () => {
            const response = await api.get('/activated-social-login', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status !== 200) {
                throw new Error('Failed to fetch brands');
            }

            return response.data;
        },
    });
};