import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, token } from "../api";
import toast from "react-hot-toast";

// Function to remove product from wishlist using GET request
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ productId, userId }) => {
      if (!productId || !userId) {
        throw new Error(
          "Product ID and User ID are required to remove from wishlist"
        );
      }

      try {
        // Sending GET request to remove product from wishlist
        const response = await api.get("/wishlists-remove-product", {
          params: {
            product_id: productId,
            user_id: userId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "SYSTEM-KEY": "NOMAHD-SECRIT",
          },
        });

        // Check if the response is successful (status 200)
        if (response.status !== 200) {
          throw new Error("Failed to remove product from wishlist");
        }

        return response.data; // Returning response data (could be success message or updated wishlist)
      } catch (error) {
        console.error("Error removing product from wishlist:", error);
        throw new Error(
          error.message ||
            "An error occurred while removing product from wishlist"
        );
      }
    },
    {
      onMutate: () => {
        // Optionally handle optimistic updates here
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
      onSuccess: () => {
        queryClient.getQueryCache().getAll();
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      },
    }
  );
};

export const useNewRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, userId }) => {
      const response = await api.get("/wishlists-remove-product", {
        params: { product_id: productId, user_id: userId },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: () => {
     console.log( queryClient.getQueryCache().getAll());
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });
};
