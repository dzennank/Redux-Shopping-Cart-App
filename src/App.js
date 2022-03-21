import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector }  from 'react-redux';
import Notification from "./components/Notification";

function App() {
  const cart = useSelector(state => state.cart)
  const isLoggedIn = useSelector((e) => e.auth.isLoggedIn);
  useEffect(() => {
    const sendRequest = async() => {
      const res = await fetch('https://redux-http-39e00-default-rtdb.firebaseio.com/cartItems.json', 
      {
        method: "PUT",
        body: JSON.stringify(cart)
      }
      );
      const data = await res.json();
    };
    sendRequest();
    
    
  }, [cart]);

  return (
    <div className="App">
      <Notification type='success' message={'This is one very nice message'} />
      { !isLoggedIn && <Auth />}
      { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
