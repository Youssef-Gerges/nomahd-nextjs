import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

// export const useGetHomeCategories = () => {
//     return useQuery({
//       queryKey: ['home_categories'],
//       queryFn: async () => {
//         const response = await api.get('/home-categories')
  
//         if (response.status !== 200) {
//           throw new Error('Failed to fetch home categories');
//         }
  
//         return response.data;
//       },
//       onError: () => {
//         toast.error('Error fetching home categories. Please try again later.');
//       },
//     });
//   };

  export const useGetHomeCategories = () => {
    return useQuery({
      queryKey: ['home_categories'],
      queryFn: async () => {
        const response = await api.get('/home-categories');
        if (response.status !== 200) {
          throw new Error('Failed to fetch home categories');
        }
        return response.data;
      },
      onError: () => {
        console.error('Error fetching home categories. Please try again later.');
      },
    });
  };