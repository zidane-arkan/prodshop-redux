import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartSimpleActions } from "../../store/cart-simple";

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();
  // const incrementItem = (id) => {
  //   dispatch(cartActions.incrementItem(id));
  // };
  const incrementItem = () => {
    dispatch(cartSimpleActions.addItemToCart({ ...props.item }));
  };

  const decreaseItem = (id) => {
    dispatch(cartSimpleActions.reduceItemInCart(id));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => decreaseItem(id)}>-</button>
          <button onClick={incrementItem}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
