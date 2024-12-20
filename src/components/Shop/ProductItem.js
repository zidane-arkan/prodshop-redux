import { useDispatch, useSelector } from "react-redux";
// import { cartActions } from "../../store/cart";
import { cartSimpleActions } from "../../store/cart-simple";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cartSimple.totalQuantity);
  const addItemToCart = () => {
    dispatch(
      cartSimpleActions.addItemToCart({ items: { ...props }, totalQuantity })
    );
  };
  return (
    <li className={classes.item}>
      <Card id={id}>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
