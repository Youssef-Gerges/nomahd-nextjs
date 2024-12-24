
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import {api, token} from '../api';
import toast from 'react-hot-toast';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData) => {
      return await api.post('/carts/add', JSON.stringify(productData), {
        headers: {
             Authorization :`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onError: () => {
      console.log('Failed to add product to cart. Please try again.');
    },
    onSuccess: () => {
      console.log('Product added to cart successfully!');
      
      queryClient.invalidateQueries(['cart']);
    },
  });
};

// export const useAddToCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (productData) => {
//       const response = await fetch('https://nomahd.shop/api/v2/carts/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept':'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(productData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add product to cart');
//       }

//       return response.json(); 
//     },
//     onError: () => {
//       console.log('Failed to add product to cart. Please try again.');
//     },
//     onSuccess: () => {
//       console.log('Product added to cart successfully!');
//       queryClient.invalidateQueries(['cart']); 
//     },
//   });
// };
