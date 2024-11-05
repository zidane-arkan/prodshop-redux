import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
const CartButton = (props) => {
  const dispatcher = useDispatch();
  const handleToggleModal = () => dispatcher(cartActions.toggle());

  const cartItemsLength = useSelector((state) => state.cart.cartItems.length);
  return (
    <button className={classes.button} onClick={handleToggleModal}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemsLength}</span>
    </button>
  );
};

export default CartButton;
