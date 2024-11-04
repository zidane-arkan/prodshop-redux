import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
const CartButton = (props) => {
  const dispatcher = useDispatch();
  const handleToggleModal = () => dispatcher(cartActions.toggle());
  return (
    <button className={classes.button} onClick={handleToggleModal}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
