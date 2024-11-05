import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
const Cart = (props) => {
  const isShowingModal = useSelector((state) => state.cart.isShowingModal);
  const cartItems = useSelector((state) => state.cart.cartItems);
  return isShowingModal ? (
    <></>
  ) : (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item, id) => {
            return (
              <CartItem
                key={id}
                item={{
                  id: item.id,
                  title: item.title,
                  quantity: item.quantity,
                  total: item.quantity * item.price,
                  price: item.price,
                }}
              />
            );
          })
        ) : (
          <p>No Item, Add now!</p>
        )}
      </ul>
    </Card>
  );
};

export default Cart;
