// import { useQuery } from '@tanstack/react-query';
// import { api } from '../api';
// // import toast from 'react-hot-toast';

// export const useGetRelatedProducts = (id) => {
  
//   return useQuery({
//     queryKey: ['related-products', id], 
//     queryFn: async () => {
//       const response = await api.get(`/products/related/${id}`);

//       if (response.status !== 200) {
//         throw new Error('Failed to fetch related products');
//       }

//       return response.data;
//     },
//     onError: () => {
//       console.log('Error fetching related products. Please try again later.');
//     },
   
//   });
// };

import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

export const useGetRelatedProducts = (id) => {
  return useQuery({
    queryKey: ['related-products', id],
    queryFn: async () => {
      const response = await api.get(`/products/related/${id}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch related products');
      }

      return response.data;
    },
    enabled: !!id, // Ensure the query only runs if `id` is truthy
    onError: () => {
      console.log('Error fetching related products. Please try again later.');
    },
  });
};

