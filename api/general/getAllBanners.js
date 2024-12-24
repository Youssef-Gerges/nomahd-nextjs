import { api } from '../api';
import toast from 'react-hot-toast';
import { useQuery } from "@tanstack/react-query";
// export const useGetAllBanners = () => {
//   return useQuery({
//     queryKey: ['banners'],
//     queryFn: async () => {
//       const response = await api.get('/banners', {
//         // headers: {
//         //   'SYSTEM-KEY': 'NOMAHD-SECRIT',
//         // },
//       });

//       if (response.status !== 200) {
//         throw new Error('Failed to fetch banners');
//       }

//       return response.data;
//     },
//     onError: () => {
//       toast.error('Error fetching banners. Please try again later.');
//     },
//   });
// };



export const useGetAllBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await api.get('/banners');
      if (response.status !== 200) {
        throw new Error('Failed to fetch banners');
      }
      return response.data;
    },
    onError: () => {
      toast.error('Error fetching banners. Please try again later.');
    },
  });
};

