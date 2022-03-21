import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector, useDispatch }  from 'react-redux';
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;
function App() {
  const cart = useSelector(state => state.cart)
  const isLoggedIn = useSelector((e) => e.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification)
  const dispatch = useDispatch()
  useEffect(() => {
    if(isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async() => {
      //Send state as Sending request
      dispatch(uiActions.showNotification({
        open: true,
        message: "sending Request",
        type: 'warning'
      }))
      const res = await fetch('https://redux-http-39e00-default-rtdb.firebaseio.com/cartItems.json', 
      {
        method: "PUT",
        body: JSON.stringify(cart)
      }
      );
      const data = await res.json();
      //Sent state as Request is successful
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sent Request to Detabase Successfully",
        type: 'success'
      }))
    };
    sendRequest().catch(err => {
      dispatch(uiActions.showNotification({
        open: true,
        message: "sending Request failed",
        type: 'error'
      }))
    });
    
    
  }, [cart]);

  return (
    <div className="App">
      { notification && <Notification type={notification.type} message={notification.message}/>}
      { !isLoggedIn && <Auth />}
      { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
