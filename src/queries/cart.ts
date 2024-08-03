import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { USER_TOKEN_FIELD_LS } from "~/constants/localStorage";
import { CartItem, ItemInCart } from "~/models/CartItem";
import { ApiResponse } from "~/utils/api";

export function useCart() {
  const headers = {};
  const token = localStorage.getItem(USER_TOKEN_FIELD_LS);

  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    headers.Authorization = `Basic ${token}`;
  }

  return useQuery<CartItem, AxiosError>("cart", async () => {
    const res = await axios.get<ApiResponse<CartItem>>(
      `${API_PATHS.cart}/api/profile/cart`,
      {
        headers,
      }
    );
    return res.data.data;
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  const headers = {};
  const token = localStorage.getItem(USER_TOKEN_FIELD_LS);

  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    headers.Authorization = `Basic ${token}`;
  }

  return useMutation((itemInCart: ItemInCart) =>
    axios.put<ItemInCart[]>(`${API_PATHS.cart}/api/profile/cart`, itemInCart, {
      headers,
    })
  );
}
