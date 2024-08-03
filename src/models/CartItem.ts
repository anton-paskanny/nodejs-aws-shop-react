export type ItemInCart = {
  cartId?: string;
  productId?: string;
  count: number;
};

export type CartItem = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  items: ItemInCart[];
};
