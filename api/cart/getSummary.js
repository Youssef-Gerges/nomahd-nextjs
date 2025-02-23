import { useQuery } from "@tanstack/react-query";
import {api, temp_user_id, token, user_id} from '../api';
import { useState, useEffect } from'react';
import toast from 'react-hot-toast';

export const useGetSummary = () => {


  return useQuery({
    queryKey: ['summary'],
    queryFn: async () => {
      const response = await api.post(`/cart-summary`, {
        user_id: user_id,
        temp_user_id: temp_user_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch cart summary');
      }

      return response.data;
    },
    onError: () => {
      toast.error('Unable to fetch cart summary. Please try again later.');
    },
  });
};
