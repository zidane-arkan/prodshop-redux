import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, getAllCartData } from "./store/cart-simple";
import { Fragment, useEffect } from "react";

let isInitial = true;
function App() {
  const dispatcher = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.isCartVisible);
  const cartItems = useSelector((state) => state.cartSimple);
  const cartChanged = useSelector((state) => state.cartSimple.changed);
  const notificationStatus = useSelector(
    (state) => state.ui.notificationStatus
  );

  // useEffect(() => {
  //   const sentCartData = async () => {
  //     dispatcher(
  //       uiSliceActions.handleNotification({
  //         status: "pending",
  //         title: "Pending...",
  //         message: "Pending sending data...",
  //       })
  //     );
  //     const res = await fetch(
  //       "https://prodshop-redux-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
  //       {
  //         body: JSON.stringify(cartItems),
  //         method: "PUT",
  //       }
  //     );
  //     if (!res.ok) {
  //       throw new Error("An error occured! Sending Cart Data Failed!");
  //     }
  //     const responseData = await res.json();
  //     dispatcher(
  //       uiSliceActions.handleNotification({
  //         status: "success",
  //         title: "Success...",
  //         message: "Successfully sending data.",
  //       })
  //     );
  //     return responseData;
  //   };
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }
  //   sentCartData().catch((error) => {
  //     dispatcher(
  //       uiSliceActions.handleNotification({
  //         status: "error",
  //         title: "Error Occured...",
  //         message: error.message,
  //       })
  //     );
  //   });
  // }, [cartItems, dispatcher]);
  useEffect(() => {
    dispatcher(getAllCartData());
  }, [dispatcher]);

  useEffect(() => {
    // const dispatchSendCartData = sendCartData(cartItems);
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cartChanged) {
      dispatcher(sendCartData(cartItems));
    }
    // dispatchSendCartData(dispatcher);
  }, [cartItems, dispatcher, cartChanged]);
  return (
    <Fragment>
      {notificationStatus && (
        <Notification
          status={notificationStatus.status}
          title={notificationStatus.title}
          message={notificationStatus.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
