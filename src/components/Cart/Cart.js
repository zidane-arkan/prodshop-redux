import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { getAllCartData } from "../../store/cart-simple";
const Cart = (props) => {
  const dispatcher = useDispatch();
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const cartSimpleItems = useSelector((state) => state.cartSimple.cartItems);
  // dispatcher(getAllCartData());
  console.log(cartSimpleItems);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartSimpleItems.length > 0 ? (
          cartSimpleItems.map((item, id) => {
            return (
              <CartItem
                key={id}
                item={{
                  id: item.id,
                  title: item.title,
                  quantity: item.quantity,
                  total: item.totalPrice,
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
