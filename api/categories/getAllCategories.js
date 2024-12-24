import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories', {
        // headers: {
        //   'SYSTEM-KEY': 'NOMAHD-SECRIT',
        // },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch categories');
      }

      return response.data;
    },
    onError: () => {
      console.log('Error fetching categories. Please try again later.');
    }
})}
