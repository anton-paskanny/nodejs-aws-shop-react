import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ItemInCart } from "~/models/CartItem";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";
import { AvailableProduct } from "~/models/Product";

type CartItemsProps = {
  items: ItemInCart[];
  isEditable: boolean;
};

type CartItemComponentProps = {
  cartItem: ItemInCart;
  isEditable: boolean;
  availableProducts: AvailableProduct[];
};

export const CartItemComponent = ({
  cartItem,
  isEditable,
  availableProducts,
}: CartItemComponentProps) => {
  const fullProduct = availableProducts.find(
    (item) => item.id === cartItem.productId
  );

  if (!fullProduct) {
    return (
      <Typography>
        No product data was found for {cartItem.productId} id
      </Typography>
    );
  }

  return (
    <ListItem
      sx={{ padding: (theme) => theme.spacing(1, 0) }}
      key={cartItem.productId}
    >
      {isEditable && <AddProductToCart product={fullProduct} />}
      <ListItemText
        primary={fullProduct.title}
        secondary={fullProduct.description}
      />
      <Typography variant="body2">
        {formatAsPrice(fullProduct.price)} x {cartItem.count} ={" "}
        {formatAsPrice(fullProduct.price * cartItem.count)}
      </Typography>
    </ListItem>
  );
};

export default function CartItems({ items, isEditable }: CartItemsProps) {
  const { data = [], isLoading } = useAvailableProducts();

  const totalPrice: number = items.reduce((total, item) => {
    const fullProduct = data.find((fullP) => fullP.id === item.productId);

    const itemTotal = item.count * (fullProduct ? fullProduct.price : 0);

    return total + itemTotal;
  }, 0);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <List disablePadding>
        {items.map((cartItem: ItemInCart) => (
          <CartItemComponent
            key={cartItem.productId}
            cartItem={cartItem}
            isEditable={isEditable}
            availableProducts={data}
          />
        ))}
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Shipping" />
          <Typography variant="body2">Free</Typography>
        </ListItem>
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {formatAsPrice(totalPrice)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
