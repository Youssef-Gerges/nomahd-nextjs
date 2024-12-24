import { api, token } from '../api';

export const useGetBalance = async (id) => {
  if (!id) {
    throw new Error('An ID is required to fetch the balance');
  }

  try {
    const response = await api.get(`/wallet/balance/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'SYSTEM-KEY': 'NOMAHD-SECRIT',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch balance');
    }

    return response.data; 
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw new Error(error.message || 'An error occurred while fetching the balance');
  }
};
