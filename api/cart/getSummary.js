import { useQuery } from "@tanstack/react-query";
import { api ,token} from '../api';
import { useState, useEffect } from'react';
import toast from 'react-hot-toast';

export const useGetSummary = () => {
    const [userId, setUserId] = useState(null);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const id = localStorage.getItem("id");
        setUserId(id);
      }
    }, []);
  return useQuery({
    queryKey: ['summary'],
    queryFn: async () => {
      const response = await api.post(`/cart-summary`, {
        user_id: userId
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
    enabled: !!userId,
  });
};
