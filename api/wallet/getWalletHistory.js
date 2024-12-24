import { api, token } from '../api';

export const useGetWalletHistory = async (id) => {
  if (!id) {
    throw new Error('An ID is required to fetch the wallet history');
  }

  try {
    const response = await api.get(`/wallet/history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'SYSTEM-KEY': 'NOMAHD-SECRIT',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch wallet history');
    }

    return response.data; 
  } catch (error) {
    console.error('Error fetching wallet history:', error);
    throw new Error(error.message || 'An error occurred while fetching the wallet history');
  }
};
