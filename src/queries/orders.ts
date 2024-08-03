import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { USER_TOKEN_FIELD_LS } from "~/constants/localStorage";
import { OrderStatus } from "~/constants/order";
import { Order } from "~/models/Order";

export function useOrders() {
  return useQuery<Order[], AxiosError>("orders", async () => {
    const res = await axios.get<Order[]>(`${API_PATHS.order}/order`);
    return res.data;
  });
}

export function useInvalidateOrders() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("orders", { exact: true }),
    []
  );
}

export function useUpdateOrderStatus() {
  return useMutation(
    (values: { id: string; status: OrderStatus; comment: string }) => {
      const { id, ...data } = values;
      return axios.put(`${API_PATHS.order}/order/${id}/status`, data, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      });
    }
  );
}

export function useSubmitOrder() {
  const headers = {};
  const token = localStorage.getItem(USER_TOKEN_FIELD_LS);

  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    headers.Authorization = `Basic ${token}`;
  }

  return useMutation((values: Omit<Order, "id">) => {
    const body = {
      payment: {
        type: "default",
      },
      delivery: {
        type: "default",
        address: values.address.address,
      },
      comments: values.address.comment,
    };

    return axios.post<Omit<Order, "id">>(
      `${API_PATHS.order}/api/profile/cart/checkout`,
      body,
      {
        headers,
      }
    );
  });
}

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id: string) =>
      queryClient.invalidateQueries(["order", { id }], { exact: true }),
    []
  );
}

export function useDeleteOrder() {
  return useMutation((id: string) =>
    axios.delete(`${API_PATHS.order}/order/${id}`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    })
  );
}
