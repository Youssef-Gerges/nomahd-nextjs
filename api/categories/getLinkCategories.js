import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
// export const useGetLinkCategories = (link) => {
//   return useQuery({
    
//     queryFn: async () => {
//       const response = await api.get(link);

//       if (response.status !== 200) {
//         throw new Error('Failed to fetch categories');
//       }

//       return response.data;
//     },
//     onError: () => {
//       console.log('Error fetching categories. Please try again later.');
//     }
// })}

export const useGetLinkCategories = (link) => {
  return useQuery({
    queryKey: ['categories', link],
    queryFn: async () => {
      if (!link) {
        throw new Error('No link provided for fetching categories');
      }

      // Remove base URL if it exists in the link
      const normalizedLink = link.replace('https://nomahd.com/api/v2', '');

      const response = await api.get(normalizedLink);

      if (response.status !== 200) {
        throw new Error('Failed to fetch categories');
      }

      return response.data;
    },
    onError: (error) => {
      console.error('Error fetching categories:', error.message);
    },
    enabled: !!link,
  });
};
