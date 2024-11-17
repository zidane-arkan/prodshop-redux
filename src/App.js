import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";

function App() {
  const isCartVisible = useSelector((state) => state.ui.isCartVisible);
  const cartItems = useSelector((state) => state.cartSimple.cartItems);
  useEffect(() => {
    fetch(
      "https://prodshop-redux-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      {
        body: JSON.stringify(cartItems),
        method: "PUT",
      }
    );
  }, [cartItems]);
  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
