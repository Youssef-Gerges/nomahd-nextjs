import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import toast from 'react-hot-toast';

export const useGetAllProducts = (page) => {
  return useQuery({
    queryKey: ['all-products', page], 
    queryFn: async () => {
      const response = await api.get(`/products?page=${page}`, {
        headers: {
          // 'SYSTEM-KEY': 'NOMAHD-SECRIT',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch products');
      }

      return response.data;
    },
    onError: () => {
      console.log('Error fetching products. Please try again later.');
    },
    
  });
};

export const fetchData = async () => {
  const response = await fetch("https://nomahd.shop/api/v2/products/inhouse");
  const json = await response.json();
  setData(json);
}