import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  const dispatch = useDispatch();
  const addItemToCart = (id) => {
    dispatch(cartActions.addItems(id));
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
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
